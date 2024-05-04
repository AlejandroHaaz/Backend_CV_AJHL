const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor teclea tu nombre"]
    },
    email: {
        type: String,
        required: [true, "Por favor teclea tu email"],
        unique: true
    },
    password:{
        type: String, 
        required: [true, "Por favor teclea tu password"]
    },
    esAdmin: {
        type: Boolean,
        default: false //si yo al mommento de crear un usuario y no selecciona ese campo en automatica pondrá el valor de dafault
    }
}, {
    timestamps: true //para que automáticamente Moongose cree el tiempo en que se creo y modificó
})

module.exports= mongoose.model('User', userSchema) //hay que poner en letra capital y singular porque mongoose lo creara en minúsculas y plural