const errorList = require('../data/errorList');

const errorMiddleware = (req, res, next) => {
  // Generar un número aleatorio entre 0 y 1
  const random = Math.random();

  // Probabilidad de generar un error: 20%
  if (random < 0.2) {
    // Generar un error aleatorio
    const error = new Error('Error aleatorio generado por el middleware');
    error.statusCode = 500; // Código de estado de error interno del servidor
    const url = req.protocol + "://" + req.get("host") + req.originalUrl;
    errorList.push({
      url: url,
      method: req.method,
      error: error.message,
      date: new Date()
    }); // Añadir el error a la lista de errores
    next(error); // Pasar el error al siguiente middleware o controlador de errores
  } else {
    next(); // Continuar con el siguiente middleware
  }
};

module.exports = errorMiddleware;
