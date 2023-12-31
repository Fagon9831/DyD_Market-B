const models = require('../models')
const Joi = require('joi');
var crypto = require('crypto');
const { encriptar } = require('../security/encriptacion')
const schema = Joi.object({
    id_pedido: Joi.string().required(),
    cliente_id: Joi.string().required(),
    fecha: Joi.date().required(),

})
const consultarPedidos = async (req, res) => {
    const Pedidos = models.Pedido
    try {
        const pedido = await Pedidos.findAll()
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(pedido)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
const crearPedidos = async (req, res) => {
    const Pedidos = models.Pedido
    const { id_pedido, cliente_id, fecha } = req.body
    try {

        const { error, value } = schema.validate({
            "id_pedido": id_pedido,
            "cliente_id": cliente_id,
            "fecha": fecha
        })

        if (error) {
            console.log(error)
            res.status(500).json(error)
        } else {

            const pedido = await Pedidos.create({
                id_pedido: id_pedido,
                cliente_id: cliente_id,
                fecha: fecha
            })
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.json(`La factura se ha agregado con exito`)
        }
    } catch (error) {
         console.log(error)
        res.status(500).json(error)
    }
}
module.exports = { consultarPedidos, crearPedidos }
