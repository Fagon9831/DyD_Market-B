const models = require('../models')
const jwt = require('jsonwebtoken')
const Joi = require('joi');

const schema = Joi.object({
    ciudad: Joi.string().required(),
})
const crearCiudad = async (req, res) => {
    const { ciudad } = req.body
    const Ciudads = models.Ciudad
    
    try {
        const { error, value } = schema.validate({
            "ciudad": ciudad,
        })
        if (error) {
            res.status(500).json(error)
        } else {
            const ciudads = await Ciudads.create({
                ciudad: ciudad,
            })
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.json(`El producto se ha agregado con exito`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const consultarCiudades = async (req, res) => {
    const Ciudads = models.Ciudad
    try {

        const ciudad = await Ciudads.findAll()
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(ciudad)
    } catch (error) {
        res.status(500).json(error)
    }
}
const consultarDocumentos = async (req, res) => {
    const Documentos = models.Documento
    try {

        const documento = await Documentos.findAll()
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(documento)
    } catch (error) {
        res.status(500).json(error)
    }
}
const EliminarCiudad = async (req, res) => {
    const Ciudads = models.Ciudad
    try {
        const id = req.body.id_ciudad

        const ciudad = await Ciudads.destroy({
            where: {
                "id_ciudad": id
            }
        })
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(`La ciudad se ha eliminado correctamente`)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {consultarDocumentos, crearCiudad,consultarCiudades,EliminarCiudad}
