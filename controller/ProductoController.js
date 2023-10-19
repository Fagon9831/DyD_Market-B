const models = require('../models')
const jwt = require('jsonwebtoken')
const Joi = require('joi');

const schema = Joi.object({
    name_producto: Joi.string().required(),
    descripcion: Joi.string().required(),
    precio: Joi.string().required(),
    cod_categoria: Joi.number().required(),
    inventario: Joi.number().required()

})
const crearProducto = async (req, res) => {
    const Productos = models.Producto
    const { name_producto, descripcion, precio, cod_categoria, inventario } = req.body
    try {        

        const { error, value } = schema.validate({
            "name_producto": name_producto,
            "descripcion": descripcion,
            "precio": precio,
            "cod_categoria": cod_categoria,
            "inventario": inventario
        })

        if (error) {
            res.status(500).json(error)
        } else {

            const producto = await Productos.create({
                name_producto: name_producto,
                descripcion: descripcion,
                precio: precio,
                cod_categoria: cod_categoria,
                inventario: inventario
            })
            res.json(`El producto se ha agregado con exito`)
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
}

const consultarProductos = async (req, res) => {
    const Productos = models.Producto
    try {

        const producto = await Productos.findAll()
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json(error)
    }
}

const ModificarProductos = async (req, res) => {
    const Productos = models.Producto
    try {
        const { name_producto, descripcion, precio, cod_categoria, inventario } = req.body
        const id = req.params.id
        const { error, value } = schema.validate({
            "name_producto": name_producto,
            "descripcion": descripcion,
            "precio": precio,
            "cod_categoria": cod_categoria,
            "inventario": inventario
        })

        if (error) {
            res.status(500).json(error)
        } else {
            const producto = await Productos.findOne({
                where:{
                  "id_producto":id      
                }
              })
              producto.name_producto=name_producto
              producto.descripcion=descripcion
              producto.precio=precio
              producto.cod_categoria=cod_categoria
              producto.inventario=inventario
              await producto.save()
            res.status(200).json(producto)
        }
    
    } catch (error) {
        res.status(500).json(error)
    }
  }

  const EliminarProductos = async (req, res) => {
    const Productos = models.Producto
    try {
        const id = req.params.id
       
            const producto = await Productos.destroy({
                where:{
                  "id_producto":id      
                }
              })              
            res.status(200).json(`El producto se ha eliminado correctamente`)            
    } catch (error) {
        res.status(500).json(error)
    }
  }

module.exports = { crearProducto, consultarProductos,ModificarProductos,EliminarProductos }
