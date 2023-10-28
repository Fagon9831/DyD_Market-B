const models = require('../models')
const jwt = require('jsonwebtoken')
const Joi = require('joi');

const schema = Joi.object({
    name_producto: Joi.string().required(),
    descripcion: Joi.string().required(),
    precio: Joi.number().required(),
    cod_categoria: Joi.number().required(),
    inventario: Joi.number().required(),
    url:Joi.string().required()
})
const schemaModificar = Joi.object({
    descripcion: Joi.string().required(),
    precio: Joi.number().required(),
    inventario: Joi.number().required()
})
const crearProducto = async (req, res) => {
    const Productos = models.Producto
    const { url,name_producto, descripcion, precio, cod_categoria, inventario } = req.body
    try {                
        const { error, value } = schema.validate({
            "name_producto": name_producto,
            "descripcion": descripcion,
            "precio": precio,
            "cod_categoria": cod_categoria,
            "inventario": inventario,
            "url": url
        })

        if (error) {
            console.log(error)
            res.status(500).json(error)
        } else {

            const producto = await Productos.create({
                name_producto: name_producto,
                descripcion: descripcion,
                precio: precio,
                cod_categoria: cod_categoria,
                inventario: inventario,
                url:url
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

const consultarProductos = async (req, res) => {
    const Productos = models.Producto
    try {

        const producto = await Productos.findAll()
        res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json(error)
    }
}
const consultarProductosbyCat = async (req, res) => {
    const id=req.params.id
    const Productos = models.Producto
    try {

        const producto = await Productos.findAll({
            where:{
              "cod_categoria":id      
            }
          })
          res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json(error)
    }
}
const ModificarProductos = async (req, res) => {
    const Productos = models.Producto
    try {
        const { id_producto, descripcion, precio, inventario } = req.body       
        const { error, value } = schemaModificar.validate({
            "descripcion": descripcion,
            "precio": precio,            
            "inventario": inventario,            
        })

        if (error) {
            console.log(error)
            res.status(500).json(error)
        } else {
            const producto = await Productos.findOne({
                where:{
                  "id_producto":id_producto      
                }
              })
              res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
              producto.descripcion=descripcion
              producto.precio=precio
              producto.inventario=inventario
              await producto.save()
            res.status(200).json(producto)
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
  }

  const EliminarProductos = async (req, res) => {
    const Productos = models.Producto
    try {
        const id = req.body.id_producto
       
            const producto = await Productos.destroy({
                where:{
                  "id_producto":id      
                }
              })   
              res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");           
            res.status(200).json(`El producto se ha eliminado correctamente`)            
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
  }

  const consultarProductosxID = async (req, res) => {
    const id=req.body.id
    const Productos = models.Producto
    try {

        const producto = await Productos.findOne({
            where:{
              "id_producto":id      
            }
          })
          res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = { crearProducto, consultarProductos, consultarProductosxID,ModificarProductos,EliminarProductos,consultarProductosbyCat }
