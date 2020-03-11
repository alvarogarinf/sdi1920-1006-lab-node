module.exports = function(app) {
    app.get("/canciones", function(req, res) {
        var respuesta = "";

        if(req.query.nombre != null)
            respuesta += 'Nombre: ' + req.query.nombre +'<br>';

        if(typeof (req.query.autor) != "undefined")
              respuesta += 'Autor: '+ req.query.autor;

        res.send(respuesta);
    });
};



module.exports = function(app) {
    app.get('/suma', function(req, res) {
        var respuesta = parseInt(req.query.num1) + parseInt(req.query.num2);
        res.send(String(respuesta));
    });
};