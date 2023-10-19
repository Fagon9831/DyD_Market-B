const models = require('../models')
const jwt=require('jsonwebtoken')
const  { desencriptar} =require('../security/encriptacion')
const iniciarSesion = async (req, res) => {
    const user = req.body.usuario
    const pass = req.body.contraseña

    try {
        const Clientes = models.Cliente
        const session = models.Session

        const result =await session.findOne({
            where: { usuario: user }
        })
        if(!result){//no existe
            res.status(401).json({msg:"Usuario y/o contraseña incorrectos"})
            return;
        }
        if(desencriptar(result.contraseña)!==pass){
            res.status(401).json({msg:"Usuario y/o contraseña incorrectos"})
            return;
        }
        let objetoJWT = {
            user,
            pass
        }
        jwt.sign(objetoJWT,'robertoRomero',{expiresIn:'1h'},(err,token)=>{
            if(err){
                res.status(500).json({msg:err})
                return;
            }else{
                res.status(200).json({msg:"Token Creado",token:token})
                return
            }
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { iniciarSesion }
