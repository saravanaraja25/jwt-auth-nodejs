const router= require('express').Router();
const verify=require('../verify');

router.get('/ss',verify,(req,res)=>{
    res.send("YOYOY");
})


module.exports=router;