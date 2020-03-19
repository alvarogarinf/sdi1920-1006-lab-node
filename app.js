//mongodb://admin:<password>@tiendamusica-shard-00-00-iay4q.mongodb.net:27017,tiendamusica-shard-00-01-iay4q.mongodb.net:27017,tiendamusica-shard-00-02-iay4q.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true&w=majority

// Módulos
var express = require('express');
var app = express();
let mongo = require('mongodb');
var swig = require('swig');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Variables
app.set('port', 8081);
app.set('db','mongodb://admin:sdi@tiendamusica-shard-00-00-iay4q.mongodb.net:27017,tiendamusica-shard-00-01-iay4q.mongodb.net:27017,tiendamusica-shard-00-02-iay4q.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true&w=majority');

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app,swig); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app,swig,mongo); // (app, param1, param2, etc.)
require("./routes/rautores.js")(app,swig); // (app, param1, param2, etc.)
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
app.get('/canciones/:id', function (req, res) {
    var respuesta = 'id: ' + req.params.id;
    res.send(respuesta);
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
    mongo.MongoClient.connect(app.get('db'), function(err, db) {
        if (err) {
            res.send("Error de conexión: " + err);
        } else {
            let collection = db.collection('canciones');
            collection.insert(cancion, function(err, result) {
                if (err) {
                    res.send("Error al insertar " + err);
                } else {
                    res.send("Agregada id: "+ result.ops[0]._id);
                }
                db.close();
            });
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
