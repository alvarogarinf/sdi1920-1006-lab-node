module.exports = function (app, swig, gestorBD) {
    app.post("/comentarios/:cancion_id", function (req, res) {
        let comentario = {
            autor: req.session.usuario,
            texto: req.body.comentario,
            cancion_id: req.params.id,
            _id: req.session.id
        }
// Conectarse
        gestorBD.insertarComentario(comentario, function (id) {
            if (id == null) {
                res.send("Error al insertar comentario");
            } else {
                    res.send("Agregado el comentario: " + id);
                }
        });
    });
};