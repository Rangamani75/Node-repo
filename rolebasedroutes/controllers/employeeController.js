const Employee = require('../models/employeeModel')
const validateCreate = (data) => {
if (!data) return { valid:false, message:'Invalid data' }
const { name, position, department, salary, status } = data
if (!name || !position || !department || salary === undefined || status === undefined) return { valid:false, message:'Missing required fields' }
if (typeof salary !== 'number') return { valid:false, message:'Salary must be a number' }
return { valid:true }
}
const getAllEmployees = (req, res) => {
const list = Employee.getAll()
res.status(200).json(list)
}
const createEmployee = (req, res) => {
const check = validateCreate(req.body)
if (!check.valid) return res.status(400).json({ message: check.message })
const created = Employee.create(req.body)
res.status(201).json(created)
}
const updateEmployee = (req, res) => {
const id = req.params.id
const existing = Employee.getById(id)
if (!existing) return res.status(404).json({ message: 'Employee not found' })
const payload = req.body
if (payload.salary !== undefined && typeof payload.salary !== 'number') return res.status(400).json({ message: 'Salary must be a number' })
const updated = Employee.update(id, payload)
res.status(200).json(updated)
}
const deleteEmployee = (req, res) => {
const id = req.params.id
const existing = Employee.getById(id)
if (!existing) return res.status(404).json({ message: 'Employee not found' })
Employee.remove(id)
res.status(200).json({ message: 'Employee deleted' })
}
module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee }