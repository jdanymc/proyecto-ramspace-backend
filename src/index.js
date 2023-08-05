const express = require("express");
const {config} = require("./config");
const fs = require('fs');

const articulo_imagenApi = require("./routes/articulo_imagen.routes");
const articuloApi = require("./routes/articulo.routes");
const categoriaApi = require("./routes/categoria.routes");
const clienteApi = require("./routes/cliente.routes");
const descuentoApi = require("./routes/descuento.routes");
const marcaApi = require("./routes/marca.routes");
const metodo_pagoApi = require("./routes/metodo_pago.routes");
const pedido_descuentoApi = require("./routes/pedido_descuento.routes");
const pedido_detalleApi = require("./routes/pedido_detalle.routes");
const pedidoApi = require("./routes/pedido.routes");
const tipo_productoApi = require("./routes/tipo_producto.routes");
const ubigeoApi = require("./routes/ubigeo.routes");
const unidad_medidaApi = require("./routes/unidad_medida.routes");
const usuarioApi = require("./routes/usuario.routes");

const cors = require('cors')

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/src/docs/swagger.css"), 'utf8');


app.use(cors())
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.get('/',(req,res)=>{
    res.json({
        status:true,
        content:'servidor con prisma activo'
    })
})

app.use("/api", articulo_imagenApi);
app.use("/api", articuloApi);
app.use("/api", categoriaApi);
app.use("/api", clienteApi);
app.use("/api", descuentoApi);
app.use("/api", marcaApi);
app.use("/api", metodo_pagoApi);
app.use("/api", pedido_descuentoApi);
app.use("/api", pedido_detalleApi);
app.use("/api", pedidoApi);
app.use("/api", tipo_productoApi);
app.use("/api", ubigeoApi);
app.use("/api", unidad_medidaApi);
app.use("/api", usuarioApi);


app.listen(config.port);

console.log(`Server on http://localhost:${config.port}`);