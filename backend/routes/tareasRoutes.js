const express= require('express')
const {protect} = require('../middleware/authMiddleware')
const {getTareas, getTareasPublicas, crearTareas, updateTareas, deleteTareas} = require('../controllers/tareasController')

const router = express.Router()
//versión simplificada
router.route('/').get(protect, getTareas).post(protect, crearTareas)

//Versión extendida
//router.get('/', protect, getTareas)
//router.post('/', protect, crearTareas)

//Versión simplificada
router.route('/:id').delete(protect, deleteTareas).put(protect, updateTareas)

//Versión extendida
//router.put('/:id', protect, updateTareas)
//router.delete('/:id', protect, deleteTareas)

// Ruta pública para obtener tareas
router.get('/publicas', getTareasPublicas)

module.exports = router
