const models = require('../models')
const Joi = require('joi');
var crypto = require('crypto');
const { encriptar } = require('../security/encriptacion')

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
const schemaModificar = Joi.object({
    direccion: Joi.string().required(),
    telefono: Joi.number().required().min(3000000000).max(3999999999),
    correo: Joi.string().email().required(),
})
const createEmpleado = async (req, res) => {

    const Empleados = models.Empleado
    const session = models.Session
    try {

        const myArray = new Uint8Array(1);
        const {  contraseña, nombre, apellido, direccion, telefono, ciudad_id, documento, documento_id, correo } = req.body
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
            console.log(error)
        } else {
            const sessionC = await session.create({
                id_session: codeS,
                usuario:correo ,//`${usuario}${crypto.getRandomValues(myArray)}`,
                contraseña: encriptar(contraseña),
                tipo_id: 2

            })
            const empleado = await Empleados.create({
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
            res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.json(`El usuario se ha creado exitosamente su usuario creado es:${nombre}`)
        }

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }

}
const consultarEmpleados = async (req, res) => {
    const Empleados = models.Empleado
    try {
        const empleado = await Empleados.findAll()
        res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(empleado)
    } catch (error) {
        res.status(500).json(error)
    }
}

const ModificarEmpleados = async (req, res) => {
    const Empleados = models.Empleado
    try {
        const { direccion, telefono, correo } = req.body
        const id = req.body.id_empleado
        const { error, value } = schemaModificar.validate({
            "direccion": direccion,
            "telefono": telefono,          
            "correo": correo            
        })
        if (error) {
            res.status(500).json(error)
        } else {
            const empleado = await Empleados.findOne({
                where: {
                    "id_empleado": id
                }
            })
            
            empleado.direccion = direccion
            empleado.telefono = telefono
            empleado.correo = correo
            await empleado.save()
            res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.status(200).json(empleado)
        }

    } catch (error) {
        res.status(500).json(error)
    }
}
const EliminarEmpleados = async (req, res) => {
    const Empleados = models.Empleado
    const Sessiones = models.Session
    try {
        const id = req.body.id_empleado        
        const empleado = await Empleados.destroy({
            where: {
                "session_code": id
            }
        })
        const session = await Sessiones.destroy({
            where: {
                "id_session": id
            }
        })
        res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.status(200).json(`El empleado se ha eliminado correctamente`)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)        
    }
}


module.exports = { createEmpleado, consultarEmpleados, ModificarEmpleados, EliminarEmpleados }
