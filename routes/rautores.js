module.exports = function (app, swig, gestorBD) {

    app.get("/autores", function (req, res) {
        let autores = [{
            "nombre": "Roger Waters",
            "grupo": "Pink Floyd",
            "rol": "Cantante"
        }, {
            "nombre": "Alex Turner",
            "grupo": "Arctic monkeys",
            "rol": "Cantante"
        }, {
            "nombre": "Stevie Nicks",
            "grupo": "Fleetwood Mac",
            "rol": "Cantante"
        }];

        let respuesta = swig.renderFile('views/autores.html', {
            autores: autores
        });

        res.send(respuesta);
    });

    app.get('/autor', function (req, res) {
        res.redirect('/autores');
    });

    app.get('/autores/agregar', function (req, res) {
        let respuesta = swig.renderFile('views/autores-agregar.html', {});
        let roles_array = ['cantante', 'batería', 'guitarrista', 'bajista', 'teclista'];

        res.send(respuesta);
    });

    app.post("/autor", function (req, res) {
        var respuesta = "Autor agregado: " + req.body.nombre + "<br>"
            + " grupo: " + req.body.grupo + "<br>"
            + " rol: " + req.body.rol;
        res.send(respuesta);
    });
    app.get('/autores/:rol/:id', function (req, res) {
        var respuesta = 'id: ' + req.params.id + '<br>'
            + 'Rol: ' + req.params.rol;
        res.send(respuesta);
    });
    app.get('/autores/:id', function (req, res) {
        var respuesta = 'id: ' + req.params.id;
        res.send(respuesta);
    });


};