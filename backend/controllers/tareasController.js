const asyncHandler = require('express-async-handler')
const Publicacion = require ('../models/tareasModel')
const User = require ('../models/userModel')

// Esta función se creó para que los usuarios también puedan ver las publicaciones de otros
const getTareasPublicas = asyncHandler(async (req, res) => {
    const tareas = await Publicacion.find(); // Asumiendo que hay un campo que marca las tareas como públicas
    res.status(200).json(tareas);
});

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Publicacion.find({user: req.user.id})
    res.status(200).json(tareas)
})

const crearTareas = asyncHandler (async (req, res) => {
    const {titulo, descripcion, fecha_inicio, fecha_final} = req.body

    if(!titulo || !descripcion || !fecha_inicio || !fecha_final){
        res.status(400)
        throw new Error('Por favor completa todos los campos')
    }

    //Comprobar que el usario existe y obtener su nombre
    const usuario = await User.findById(req.user.id)
    if (!usuario){
        res.status(404)
        throw new Error('Usuario no encontrado')
    }

    const tarea = await Publicacion.create ({
        user: req.user.id,
        nombreUsuario: usuario.name,
        titulo,
        descripcion,
        fecha_inicio,
        fecha_final
    })
    
    res.status(201).json(tarea)

})

const updateTareas = asyncHandler (async (req, res) => {
    
   //buscamos la tarea que deseamos modificar
    const tarea = await Publicacion.findById(req.params.id)

    if(!tarea){
        res.status(404)
        throw new Error('La tarea no existe')
    }

    if (tarea.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Usuario no autorizado');
    }

    const tareaUpdated = await Publicacion.findByIdAndUpdate(req.params.id, req.body, {new: true}) //true porque queremos que nos devuelva el documento nuevo si fuera false nos devolvería el antiguo, esto se ve en la documentación)

    res.status(200).json(tareaUpdated)
})

const deleteTareas = asyncHandler (async (req, res) => {
        
   //buscamos la tarea que deseamos eliminar
   const tarea = await Publicacion.findById(req.params.id)

   if(!tarea){
       res.status(404)
       throw new Error('La tarea no existe')
   }

   if (tarea.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Usuario no autorizado');
    }
   //const tareaDeleted = await Tarea.findByIdAndDelete(req.params.id, req.body, {new: true}) //true porque queremos que nos devuelva el documento nuevo si fuera false nos devolvería el antiguo, esto se ve en la documentación)

   await Publicacion.deleteOne(tarea)

   //res.status(200).json(tareaDeleted)
   res.status(200).json({message: 'La tarea ha sido eliminada'})

})

module.exports = {
    getTareasPublicas,
    getTareas,
    crearTareas,
    updateTareas,
    deleteTareas
}