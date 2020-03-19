module.exports = function (app, swig,mongo) {
    app.get("/nuevas/canciones", function (req, res) {
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

        let respuesta = swig.renderFile('views/tienda.html', {
            vendedor: 'Tienda de canciones',
            canciones: canciones
        });

        res.send(respuesta);
    });

    app.get('/canciones/agregar', function (req, res) {
        let respuesta = swig.renderFile('views/bagregar.html', {

        });
        res.send(respuesta);
    })
};


module.exports = function (app,swig) {
    app.get('/suma', function (req, res) {
        var respuesta = parseInt(req.query.num1) + parseInt(req.query.num2);
        res.send(String(respuesta));
    });
};

