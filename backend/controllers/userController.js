const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const register = asyncHandler (async (req, res) => {
    
    //desestructura un objeto
    const {name, email, password} = req.body //equivalente a req.body.name, req.body.email, req.body.pasword

    //verificar que me pasen los datos
    if(!name || !email || !password){
        res.status(400)
        throw new Error ('Faltan datos')

    }
    
    //verificar que el usuario no exista
    const userExiste = await User.findOne({email}) //ya solo pusimos email y no req.body.email gracias a la linea 10
    if(userExiste){
        res.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    //Hacemos el HASH
    const salt = await bcrypt.genSalt(10) //va a generar numeros aleatorios si pusimos 10 es porque va a generar números aleatorios, y agarrará el decimo
    const hashedPassword = await bcrypt.hash(password,salt)

    //Crear el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json(user)
})

const login = asyncHandler (async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,  //_id es con _ porque quiere que devuelva un objectId
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })
    } else {
        res.status(401)
        throw new Error ("Credenciales Incorrectas")
    }
})

const generarToken = (idusuario) => {
    return jwt.sign({idusuario}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const showdata = asyncHandler (async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = {
    register,
    login,
    showdata
}
