const asyncHandler = require ('express-async-handler')
const Contacto = require ('../models/formsModel')

const crearFormulario =  asyncHandler (async (req, res) => {
    const {nombre, apellido, email, celular, estadoRepublica, mensaje} = req.body

    if (!nombre || !apellido || !email || !celular || !estadoRepublica || !mensaje) {
        res.status(400);
        throw new Error('Por favor completa todos los campos');
    }

    //verificamos que el usuario no se repita al menos con el correo
    const userExiste = await Contacto.findOne({email}) 
    if(userExiste){
        res.status(400)
        throw new Error('Ese usuario ya ha enviado el formulario')
    }

    
    const formulario = await Contacto.create({
        nombre,
        apellido,
        email,
        celular,
        estadoRepublica,
        mensaje
    })

    res.status(201).json(formulario)

})

module.exports = {
    crearFormulario
}
