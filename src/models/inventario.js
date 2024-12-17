const { DB } = require("../config/db")
const format = require('pg-format')


const obtenerJoyas = async (limit = 3, order_by = 'id_ASC', page = 1) => {
    try {
        const [campo, direccion] = order_by.split("_") //id_ASC  =>  ['id', 'ASC']
        const offset = Math.abs((page - 1) * limit)

        console.log(offset)
        const SQLQUERY = format(`
            SELECT * FROM inventario
            ORDER BY %s %s
            LIMIT %s
            OFFSET %s`,
            campo,
            direccion,
            limit,
            offset
        );

        const { rows, rowCount } = await DB.query(SQLQUERY)
        const { rowCount: count } = await DB.query('SELECT * FROM inventario')   

        return {
            rows,
            rowCount,
            pages: Math.ceil(count / limit)
        }

    } catch (error) {
        throw error
    }
}

const obtenerJoyasFiltrados = async (stock_min, precio_max) => {
    try {
        const SQLQUERY = handleGetFilters(stock_min, precio_max)
        const { rows, rowCount } = await DB.query(SQLQUERY)

        return {
            rows,
            rowCount,
        }

    } catch (error) {
        throw error
    }
}

const handleGetFilters = (stock_min = '', precio_max = '', categoria = '', metal = '') => {
    let filtros = [];
    let valores = [];

    if (precio_max) {
        filtros.push(`precio <= $${filtros.length + 1}`);
        valores.push(precio_max);
    }
    if (stock_min) {
        filtros.push(`stock >= $${filtros.length + 1}`);
        valores.push(stock_min);
    }
    if (categoria) {
        filtros.push(`categoria = $${filtros.length + 1}`);
        valores.push(categoria);
    }
    if (metal) {
        filtros.push(`metal = $${filtros.length + 1}`);
        valores.push(metal);
    }

    let consulta = "SELECT * FROM inventario";

    if (filtros.length) {
        filtros = filtros.join(" AND ");
        consulta += ` WHERE ${filtros}`;
    }

    return { consulta, valores }; // Devuelve la consulta parametrizada y los valores
};

module.exports = {
    obtenerJoyas,
    obtenerJoyasFiltrados
}