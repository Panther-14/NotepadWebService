const { Router } = require("express");
const router = Router();

const verifyToken = require("../security/tkn_auth");
const NotaBusiness = require("../businesslogic/note");

router.use(verifyToken);

router.get("/consultar", (req, res) => {
    const { idUsuario, idLibreta, idPrioridad } = req.body;
    NotaBusiness.selectUserNotes({ idUsuario, idLibreta, idPrioridad })
    .then((resultados) => {
        console.log("Resultados:", resultados);
        if (resultados.length > 0) {
            res.status(200).json({ error: false, message: "Consulta de Notas exitosa", notes: resultados });
        } else {
            res.status(200).json({ error: false, message: "Nada que mostrar", notes: resultados });
        }
    })
    .catch((error) => {
        console.error("Error en la consulta:", error);
        res.status(500).json({ error: true, message: "Error en la consulta" });
    });
});

router.post("/registrar", (req, res) => {
    const { idLibreta, idPrioridad, idUsuario, titulo, contenido } = req.body;
    
    const nota = {
        idLibreta: idLibreta,
        idPrioridad: idPrioridad,
        idUsuario: idUsuario,
        titulo: titulo,
        contenido: contenido,
        tiempoCreacion: new Date().toISOString().slice(0, 19).replace("T", " "),
        eliminado: 0
    };

    NotaBusiness.insertNote(nota)
    .then((resultados) => {
        console.log("Resultados:", resultados);
        if(resultados !== undefined){
            if(resultados.affectedRows > 0){
                res.status(200).json({ error: false, message: 'Registro de Nota exitosa', affectedRows: resultados.affectedRows });
            }else{
                res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
            }
        }else{
            res.status(200).json({ error: false, message: 'Registro Repetido' });
        }
    })
    .catch((error) => {
        console.error("Error en el registro:", error);
        res.status(500).json({ error: true, message: "Error en el registro" });
    });
});

router.put("/actualizar", (req, res) => {
    const { idUsuario, idNota, titulo, contenido, idPrioridad } = req.body;
    NotaBusiness.updateNote({ idUsuario, idNota, titulo, contenido, idPrioridad })
    .then((resultados) => {
        console.log("Resultados:", resultados);
        if(resultados !== undefined){
            if(resultados.affectedRows > 0){
                res.status(200).json({ error: false, message: 'Actualización de Nota exitosa', affectedRows: resultados.affectedRows });
            }else{
                res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
            }
        }else{
            res.status(200).json({ error: false, message: 'Titulo Repetido' });
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: true, message: "Error en la actualización" });
    });
});

router.delete("/eliminar", (req, res) => {
    const { idNota, idUsuario } = req.body;
    NotaBusiness.deleteNote(idNota, idUsuario)
    .then((resultados) => {
        console.log(resultados);
        if(resultados.affectedRows > 0){
            res.status(200).json({ error: false, message: 'Eliminación de Nota exitosa', affectedRows: resultados.affectedRows });
        }else{
            res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
        }
    })
    .catch((error) => {
        console.error("Error al eliminar:", error);
    });
});

module.exports = router;
