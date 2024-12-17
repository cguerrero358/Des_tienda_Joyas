const { Router } = require('express')
const JoyasController = require('../controller/joyas.controller')

const router = Router()

router.get('/', JoyasController.getAll)
router.get('/filtros', JoyasController.getFiltered)

module.exports = router;