const mongoose = require ('mongoose')

const formularioSchema = mongoose.Schema ({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"],
        unique: true
    },
    celular: {
        type: String,
        required: [true, "El teléfono celular es obligatorio"],
    },
    estadoRepublica: {
        type: String,
        required: [true, "El estado en el que reside es obligatorio"]
    },
    mensaje: {
        type: String,
        required: [true, "El mensaje es obligatorio"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Contacto', formularioSchema)
