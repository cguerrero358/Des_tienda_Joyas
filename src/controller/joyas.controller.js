const Inventario = require('../models/inventario')

const getAll = async (req, res, next) => {

    try {
        const { limit, order_by, page } = req.query
        const response = await Inventario.obtenerJoyas(limit, order_by, page)

        res.json({
            msg: "Lista de Joyas",
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const getFiltered = async (req, res, next) => {

    try {
        const { stock_min, precio_max } = req.query
        const response = await Inventario.obtenerJoyasFiltrados(stock_min, precio_max)

        res.json({
            msg: "Lista de Joyas filtradas",
            data: response
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getFiltered
}