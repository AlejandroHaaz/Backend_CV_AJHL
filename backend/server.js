const express = require('express')
const colors= require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const {errorHandler} = require ('./middleware/errorMiddleware')
const cors = require('cors')

connectDB()

const port = process.env.PORT || 5000

//let port //let sirve para que podamos modificar su valor a lo largo del codigo, antes en vez de let se escribía var
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/tareas', require('./routes/tareasRoutes')) //con eso dividimos la funcionalidad de tal manera que ahora esta se encuentra en otro archivo
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/formularios', require('./routes/formsRoute'))

app.use (errorHandler)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`)) 
//una función flecha es como un función que se definía antes (con return) y lo que que va a la derecha es lo que va despues de la flecha, en este caso es anonima porque no tiene ningun nombre definido
// alt +96 = `` son las backticks
