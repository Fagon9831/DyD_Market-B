const jwt=require('jsonwebtoken')

const authJWT = (req,res ,next)=>{
    //console.log(req.url)
    const token = req.headers.authorization;
    if(token === null){
        res.sendStatus(403)
        return;
    }
    jwt.verify(token,'robertoRomero',(err, data)=>{
        if(err){
            res.status(403).send(err)
            return;
        }     
            next();
    })
    
}
module.exports = { authJWT }