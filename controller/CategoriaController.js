const models = require('../models')
const jwt = require('jsonwebtoken')
const Joi = require('joi');

const schema = Joi.object({
    nom_categoria: Joi.string().required(),
})
const crearCategoria = async (req, res) => {
    const Categorias = models.Categoria
    const { nom_categoria } = req.body
    try {
        const { error, value } = schema.validate({
            "nom_categoria": nom_categoria,
        })
        if (error) {
            res.status(500).json(error)
        } else {
            const categoria = await Categorias.create({
                nom_categoria: nom_categoria,
            })
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.json(`El producto se ha agregado con exito`)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const consultarCategorias = async (req, res) => {
    const Categorias = models.Categoria
    try {

        const categoria = await Categorias.findAll()
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(categoria)
    } catch (error) {
        res.status(500).json(error)
    }
}
const EliminarCategoria = async (req, res) => {
    const Categorias = models.Categoria
    try {
        const id = req.body.id_categoria

        const categoria = await Categorias.destroy({
            where: {
                "id_categoria": id
            }
        })
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(`La categoria se ha eliminado correctamente`)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { crearCategoria, consultarCategorias, EliminarCategoria }
