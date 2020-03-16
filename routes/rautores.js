module.exports = function (app,swig) {

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
    app.get("/autores/agregar", function (req, res) {
        let respuesta = swig.renderFile('views/autores-agregar.html', {

        });
        res.send(respuesta);
    });


};