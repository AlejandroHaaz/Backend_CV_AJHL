const mongoose = require('mongoose')

const connectDB = async () => { //CUANDO creo una función asíncrona siempre va a esperar a un "await" 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) 
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline) //`` backthiks sirven para usar strings y variables
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB
