const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require ('../models/userModel')

const protect = asyncHandler( async (req, res, next) => {
    //obtenemos el token
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //obtenemos el token
            token = req.headers.authorization.split(' ')[1] //1 porque en los arreglos el primer numero es 0

            //verificar la forma del token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //obtener los datos del usuario del payload del token y lo vamos a poner
            //en un objeto

            req.user = await User.findById(decoded.idusuario).select('-password') //va a poner todos los datos del usuario, menos el password

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
            
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado, no proporcionaste el token')
    }
})

module.exports ={
    protect
}