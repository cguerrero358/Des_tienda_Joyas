module.exports = {
    JEWELERY_NOT_FOUND: {
        id: 'joyaNoEncontrada',
        statusCode: 404,
        message: 'Joya no encontrada',
        description: 'La joya con el ID asignado no existe en la base de datos',
    },
    SERVER_ERROR: {
        id: 'serverError',
        statusCode: 500,
        message: 'Error interno en el servidor. Prueba más tarde',
        description: 'Error inesperado en el servidor',
    }
}