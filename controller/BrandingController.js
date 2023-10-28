const models = require('../models')

const consultarMensajes = async (req, res) => {
    const Brandings = models.Branding
    try {
        const branding = await Brandings.findOne()
        res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(branding)
    } catch (error) {
        res.status(500).json(error)
    }
}

const modificarMensajes = async (req, res) => {
    const Brandings = models.Branding
    try {
        const { quienes_somos, mision, vision,donde_comprar, como_comprar } = req.body       
        
            const branding = await Brandings.findOne({
                where:{
                  "id":1      
                }
              })
              res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            branding.quienes_somos=quienes_somos
            branding.mision=mision
            branding.vision=vision
            branding.donde_comprar=donde_comprar
            branding.como_comprar=como_comprar
              await branding.save()
            res.status(200).json(branding)
        
    
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
  }

module.exports = {consultarMensajes,modificarMensajes}
