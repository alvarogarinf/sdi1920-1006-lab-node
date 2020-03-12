// Módulos
var express = require('express');
var app = express();

var swig = require('swig');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Variables
app.set('port', 8081);

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app,swig); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app,swig); // (app, param1, param2, etc.)
// lanzar el servidor
app.listen(app.get('port'), function () {
    console.log("Servidor activo");
});
app.get('/canciones/agregar', function (req, res) {
    let respuesta = swig.renderFile('views/bagregar.html', {

    });
    res.send(respuesta);
})
app.get('/canciones/:id', function (req, res) {
    var respuesta = 'id: ' + req.params.id;
    res.send(respuesta);
});
app.get('/canciones/:genero/:id', function (req, res) {
    var respuesta = 'id: ' + req.params.id + '<br>'
        + 'Género: ' + req.params.genero;
    res.send(respuesta);
});

app.post("/canciones", function (req, res) {
    res.send("Cancion agregada: " + req.body.nombre + "<br>"
        + " genero: " + req.body.genero + "<br>"
        + " precio: " + req.body.precio);
});
app.get("/canciones", function (req, res) {
    let canciones = [{
        "nombre": "Blank space",
        "precio": "1.2"
    }, {
        "nombre": "See you again",
        "precio": "1.3"
    }, {
        "nombre": "Uptown Funk",
        "precio": "1.1"
    }];

    let respuesta = swig.renderFile('views/btienda.html', {
        vendedor: 'Tienda de canciones',
        canciones: canciones
    });

    res.send(respuesta);
});


