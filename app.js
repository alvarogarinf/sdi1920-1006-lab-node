//mongodb://admin:<password>@tiendamusica-shard-00-00-iay4q.mongodb.net:27017,tiendamusica-shard-00-01-iay4q.mongodb.net:27017,tiendamusica-shard-00-02-iay4q.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true&w=majority

// Módulos
var express = require('express');
var app = express();

let fileUpload = require('express-fileupload');
app.use(fileUpload());
let mongo = require('mongodb');
var swig = require('swig');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Variables
app.set('port', 8081);
app.set('db','mongodb://admin:sdi@tiendamusica-shard-00-00-iay4q.mongodb.net:27017,tiendamusica-shard-00-01-iay4q.mongodb.net:27017,tiendamusica-shard-00-02-iay4q.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true&w=majority');

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app,swig,gestorBD); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app,swig,gestorBD); // (app, param1, param2, etc.)
require("./routes/rautores.js")(app,swig,gestorBD); // (app, param1, param2, etc.)
// lanzar el servidor
app.listen(app.get('port'), function () {
    console.log("Servidor activo");
});
app.get('/canciones/agregar', function (req, res) {
    let respuesta = swig.renderFile('views/bagregar.html', {

    });
    res.send(respuesta);
})

app.get('/autores/agregar', function (req, res) {
    let respuesta = swig.renderFile('views/autores-agregar.html', {

    });
    let roles_array = ['cantante', 'batería', 'guitarrista', 'bajista', 'teclista'];

    res.render('autores-agregar.html',{roles:roles_array});
    res.send(respuesta);
})
app.get('/cancion/:id', function (req, res) {
    let criterio = { "_id" : gestorBD.mongo.ObjectID(req.params.id) };
    gestorBD.obtenerCanciones(criterio,function(canciones){
        if ( canciones == null ){
            res.send(respuesta);
        } else {
            let respuesta = swig.renderFile('views/bcancion.html',
                {
                    cancion : canciones[0]
                });
            res.send(respuesta);
        }
    });
});

app.get('/autores/:id', function (req, res) {
    var respuesta = 'id: ' + req.params.id;
    res.send(respuesta);
});

app.get('/canciones/:genero/:id', function (req, res) {
    var respuesta = 'id: ' + req.params.id + '<br>'
        + 'Género: ' + req.params.genero;
    res.send(respuesta);
});

app.get('/autores/:rol/:id', function (req, res) {
    var respuesta = 'id: ' + req.params.id + '<br>'
        + 'Rol: ' + req.params.rol;
    res.send(respuesta);
});


app.post("/cancion", function(req, res) {
    let cancion = {
        nombre : req.body.nombre,
        genero : req.body.genero,
        precio : req.body.precio
    }
// Conectarse
    // Conectarse
    gestorBD.insertarCancion(cancion, function(id){
        if (id == null) {
            res.send("Error al insertar canción");
        } else {
            if (req.files.portada != null) {
                let imagen = req.files.portada;
                imagen.mv('public/portadas/' + id + '.png', function(err) {
                    if (err) {
                        res.send("Error al subir la portada");
                    } else {
                        if (req.files.audio != null) {
                            let audio = req.files.audio;
                            audio.mv('public/audios/'+id+'.mp3', function(err) {
                                if (err) {
                                    res.send("Error al subir el audio");
                                } else {
                                    res.send("Agregada id: "+ id);
                                }
                            });
                        }
                    }
                });
            }

        }
    });
});



app.post("/autores", function (req, res) {
    var respuesta = "Autor agregado: " + req.body.nombre + "<br>"
        + " grupo: " + req.body.grupo + "<br>"
        + " rol: " + req.body.rol;
    res.send(respuesta);
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

app.get("/autores", function (req, res) {
    let autores = [{
        "nombre": "Roger Waters",
        "grupo" : "Pink Floyd",
        "rol" : "Cantante"
    }, {
        "nombre": "Alex Turner",
        "grupo" : "Arctic monkeys",
        "rol" : "Cantante"
    }, {
        "nombre": "Stevie Nicks",
        "grupo" : "Fleetwood Mac",
        "rol" : "Cantante"
    }];

    let respuesta = swig.renderFile('views/autores.html', {
        autores: autores
    });

    res.send(respuesta);
});

app.get('/autor', function (req,res) {
    res.redirect('/autores');
});

app.get("/tienda", function(req, res) {
    let criterio={};
    if(req.query.busqueda != null){
        criterio = {"nombre" : {$regex : ".*"+req.query.busqueda+".*"} };
    }
    gestorBD.obtenerCanciones(criterio, function(canciones) {

        if (canciones == null) {
            res.send("Error al listar ");
        } else {
            let respuesta = swig.renderFile('views/btienda.html',
                {
                    canciones : canciones
                });
            res.send(respuesta);
        }
    });
});
