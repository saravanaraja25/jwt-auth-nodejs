const router= require('express').Router();
const User=require('../model/User');
const { registerValidation,loginValidation } = require('../validation');
const bcrypt=require('bcryptjs');

router.post('/register',async (req,res)=>{    
    const {error}=registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("Email Already Exist")
    const salt=await bcrypt.genSalt(10);

    const hashpwd=await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpwd
    });
    try {
        const saveUser= await user.save();       
        res.send({user :user._id});
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login',async (req,res)=>{    
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    
    const user=await User.findOne({email: req.body.email});
    if(!user) res.status(400).send("Email Doesn't Exist")

    const pass=await bcrypt.compare(req.body.password,user.password)

    if(!pass) res.status(400).send("Invalid Password")

    res.send("Logged In");
})


router.get('/',(req,res)=>{
    res.send("Hello World");
})

module.exports=router;