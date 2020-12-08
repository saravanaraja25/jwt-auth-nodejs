const jwt=require('jsonwebtoken')

module.exports=function auth(req,res,next) {
    const authHeader=req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1]  
    if(token ==null) return res.status(401).send("No Token Generated")

    try {
        const verified=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user=verified;
        next();
    } catch (error) {
        res.status(400).send("Invaid Token")
    }
}