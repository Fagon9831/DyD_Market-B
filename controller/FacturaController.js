const models = require('../models')
const Joi = require('joi');
var crypto = require('crypto');
const { encriptar } = require('../security/encriptacion')
const schema = Joi.object({    
    producto_id: Joi.number().required(),
    cantidad: Joi.number().required(),
    pedido_id: Joi.string().required()

})
const consultarFacturas = async (req, res) => {
    const Facturas = models.Factura
    try {
        const factura = await Facturas.findAll()
        res.status(200).json(factura)
    } catch (error) {
        res.status(500).json(error)
    }
}
const crearFacturas = async (req, res) => {
    const Facturas = models.Factura
    const { producto_id, cantidad,pedido_id} = req.body
    try {        

        const { error, value } = schema.validate({            
            "producto_id": producto_id,
            "cantidad": cantidad,
            "pedido_id":pedido_id
        })

        if (error) {
            res.status(500).json(error)
        } else {

            const factura = await Facturas.create({                
                producto_id: producto_id,
                cantidad: cantidad,
                pedido_id:pedido_id
            })
            res.json(`El pedido se ha agregado con exito`)
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
}
module.exports = {consultarFacturas,crearFacturas}
