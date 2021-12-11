const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

//middlewares
app.use(bodyParser.json());

app.use((req, res, next) => {
    //Dominio que tengan acceso (Ej. "http://example.com")
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Metodos de solicitud que desea permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    //Encabezados que permite (Ej. 'X-Request-With,Content-Type')
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use(cors());
//Rutas
app.use(require('./src/routes/main.route'));
app.use(require('./src/routes/usuario.route'));
app.use(require('./src/routes/producto.route'));
app.use(require('./src/routes/pedido.route'));
app.use(require('./src/routes/factura.route'));
app.use(require('./src/routes/categoria.route'));


module.exports = app;
