const express = require('express')
const router = express.Router()
const controller = require('../controllers/employeeController')
const roleCheck = require('../middleware/roleCheckMiddleware')
router.get('/', roleCheck(['admin','hr']), controller.getAllEmployees)
router.post('/', roleCheck(['admin']), controller.createEmployee)
router.put('/:id', roleCheck(['admin','hr']), controller.updateEmployee)
router.delete('/:id', roleCheck(['admin']), controller.deleteEmployee)
module.exports = router