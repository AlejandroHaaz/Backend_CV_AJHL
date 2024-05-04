const express = require ('express')
const {crearFormulario} = require ('../controllers/formsController')

const router = express.Router()
router.post('/', crearFormulario)

module.exports = router

