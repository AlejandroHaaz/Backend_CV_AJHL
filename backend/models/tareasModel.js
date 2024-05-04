const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    nombreUsuario: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: [true, "Por favor teclea un título"]
    },
    fecha_inicio: {
        type: Date,
        required: [true, "Señale la fecha de inicio"]
    },
    fecha_final: {
        type: Date,
        required: [true, "Señale la fecha de fin"]
    },
    descripcion:{
        type: String,
        required: [true, "Por favor escribe una descripción"]
    }
}, {
    timestamps: true //cada que haga un documento (registro) mongoose podrá poner la fecha de creación y modificación
})

module.exports = mongoose.model('Tarea', tareaSchema) //cuando creamos un modelo tenemos que nombrarlo en singular y con letra capital (esta es la conveción debido a mongoose)
