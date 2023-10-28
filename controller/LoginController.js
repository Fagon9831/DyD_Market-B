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
        res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
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
                res.status(200).json({msg:"Token Creado",token:token,code_s:result.id_session,tipo_s:result.tipo_id})
                return
            }
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { iniciarSesion }
