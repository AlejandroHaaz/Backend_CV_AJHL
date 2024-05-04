const errorHandler = (err, req, res, next) => {
   const statusCode = res.statusCode ? res.statusCode : 500

   res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack  //=== es comparar el valor y tipo == solo es comparar el valor
   })
}

module.exports = {
    errorHandler
}