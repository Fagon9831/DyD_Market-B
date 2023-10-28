
const {Router} = require('express')
const router = Router();
const {createCliente,consultarClientes,ModificarClientes,EliminarClientes}=require('../controller/ClienteController')
const {createEmpleado,consultarEmpleados,ModificarEmpleados,EliminarEmpleados}=require('../controller/EmpleadoController')
const {iniciarSesion}=require('../controller/LoginController')
const {crearProducto,consultarProductos,consultarProductosxID,ModificarProductos,EliminarProductos,consultarProductosbyCat}=require('../controller/ProductoController')
const {consultarPedidos,crearPedidos}=require('../controller/PedidoController')
const {consultarFacturas,crearFacturas}=require('../controller/FacturaController')
const { authJWT }=require('../middleware/jwt')
const { uploadFile } =require('../controller/UploadFileController')
const {crearCategoria,consultarCategorias,EliminarCategoria}=require('../controller/CategoriaController')
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()})
const {consultarMensajes,modificarMensajes} =require('../controller/BrandingController')
const {crearCiudad,consultarCiudades,EliminarCiudad,consultarDocumentos}=require('../controller/CiudadController')
router.post("/login",iniciarSesion)
router.post("/CrearCliente", createCliente)
router.post("/ModificarClientes/:id",authJWT, ModificarClientes)
router.get("/ConsultarClientes",authJWT, consultarClientes)
router.delete("/EliminarClientes/:id",authJWT, EliminarClientes)
router.post("/CrearEmpleado",authJWT, createEmpleado)
router.get("/ConsultarEmpleados",authJWT, consultarEmpleados)
router.put("/ModificarEmpleado",authJWT, ModificarEmpleados)
router.delete("/EliminarEmpleados",authJWT, EliminarEmpleados)
router.post("/uploadFile",authJWT,upload.single("filename"),uploadFile)
router.post("/CrearProducto",authJWT, crearProducto)
router.put("/ModificarProducto",authJWT, ModificarProductos)
router.delete("/EliminarProducto",authJWT, EliminarProductos)
router.get("/ConsultarProducto", consultarProductos)
router.post("/ConsultarProductoxID", consultarProductosxID)
router.get("/ConsultarProductoxCat/:id", consultarProductosbyCat)
router.get("/ConsultarPedidos",authJWT, consultarPedidos)
router.post("/CrearPedidos",authJWT, crearPedidos)
router.post("/ConsultarFacturas",authJWT, consultarFacturas)
router.post("/CrearFacturas",authJWT, crearFacturas)
router.get("/ConsultarCategoria", consultarCategorias)
router.delete("/EliminarCategoria",authJWT, EliminarCategoria)
router.post("/CrearCategoria",authJWT, crearCategoria)
router.put("/ModificarMensajes",authJWT, modificarMensajes)
router.get("/ConsultarMensajes", consultarMensajes)
router.get("/ConsultarCiudad", consultarCiudades)
router.get("/ConsultarDocumento", consultarDocumentos)
router.delete("/EliminarCiudad",authJWT, EliminarCiudad)
router.post("/CrearCiudad",authJWT, crearCiudad)
/** 
/** 
 * FRONT - BACK (Dependiendo cambios )CREAR OPCION MODIFICAR CLIENTE y empleado teniendo en cuenta que el correo no se puede modificar
 * FRONT Tener presente que en elfront se debe manejar session storage para la manejo de sesion y para guardar el token jwt
 * con eso controlamos que todas las acciones vengan en un token id
 * Back Configurar las palabras claves en el .env JWT y el encoding
 *  FRONT configurar los codigos de id alfanumericos front PARA  PEDIDOS ID_PEDIDO Y FACUTRA ID_PEDIDO
*/

module.exports = router 