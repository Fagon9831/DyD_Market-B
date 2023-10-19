const models = require('../models')
const Joi = require('joi');
var crypto = require('crypto');
const { encriptar } = require('../security/encriptacion')

//const app = initializeApp(firebaseConfig);
const schema = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    direccion: Joi.string().required(),
    telefono: Joi.number().required().min(3000000000).max(3999999999),
    ciudad_id: Joi.number().required(),
    documento: Joi.number().required().min(10000000).max(9999999999),
    documento_id: Joi.number().required(),
    correo: Joi.string().email().required(),
    codeS: Joi.string().required(),
})


const createCliente = async (req, res) => {

    try {
        const Clientes = models.Cliente
        const session = models.Session
        const myArray = new Uint32Array(1);        
        const { contraseña, nombre, apellido, direccion, telefono, ciudad_id, documento, documento_id, correo } = req.body
        let codeS=`${nombre.charAt(0)}${apellido.charAt(0)}${crypto.getRandomValues(myArray)}`
        const { error, value } = schema.validate({
            "nombre": nombre,
            "apellido": apellido,
            "direccion": direccion,
            "telefono": telefono,
            "ciudad_id": ciudad_id,
            "documento": documento,
            "documento_id": documento_id,
            "correo": correo,
            "codeS": codeS
        })

        if (error) {
            res.status(500).json(error)
        } else {
            const sessionC = await session.create({
                id_session: codeS ,
                usuario: correo,//`${usuario}${crypto.getRandomValues(myArray)}`,
                contraseña: encriptar(contraseña),
                tipo_id: 1

            })
            const cliente = await Clientes.create({
                nombre: nombre,
                apellido: apellido,
                direccion: direccion,
                telefono: telefono,
                ciudad_id: ciudad_id,
                documento: documento,
                documento_id: documento_id,
                correo: correo,
                session_code: codeS
            })
            res.json(`El usuario se ha creado exitosamente su usuario creado es:${nombre}`)
        }

    } catch (error) {
        res.status(500).json(error)
    }

}
const consultarClientes = async (req, res) => {
    const Clientes = models.Cliente
    try {
        const cliente = await Clientes.findAll()
        res.status(200).json(cliente)
    } catch (error) {
        res.status(500).json(error)
    }
}

const ModificarClientes = async (req, res) => {
    const Clientes = models.Cliente
    try {
        const { nombre, apellido, direccion, telefono, ciudad_id, documento, documento_id, correo, session_code } = req.body
        const id = req.params.id
        const { error, value } = schema.validate({
            "nombre": nombre,
            "apellido": apellido,
            "direccion": direccion,
            "telefono": telefono,
            "ciudad_id": ciudad_id,
            "documento": documento,
            "documento_id": documento_id,
            "correo": correo,
            "session_code": session_code
        })
        if (error) {
            res.status(500).json(error)
        } else {
            const cliente = await Clientes.findOne({
                where: {
                    "id_cliente": id
                }
            })

            cliente.nombre = nombre
            cliente.apellido = apellido
            cliente.direccion = direccion
            cliente.telefono = telefono
            cliente.ciudad_id = ciudad_id
            cliente.documento = documento
            cliente.documento_id = documento_id
            cliente.correo = correo
            cliente.session_code = session_code
            await cliente.save()
            res.status(200).json(cliente)
        }

    } catch (error) {
        res.status(500).json(error)
    }
}
const EliminarClientes = async (req, res) => {
    const Clientes = models.Cliente
    try {
        const id = req.params.id
       
            const cliente = await Clientes.destroy({
                where:{
                  "id_cliente":id      
                }
              })              
            res.status(200).json(`El cliente se ha eliminado correctamente`)            
    } catch (error) {
        res.status(500).json(error)
    }
  }



module.exports = { createCliente,consultarClientes,ModificarClientes,EliminarClientes }
