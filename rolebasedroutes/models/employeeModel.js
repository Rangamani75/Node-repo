const { v4: uuidv4 } = require('uuid')
let employees = [
{ id: uuidv4(), name: 'Alice', position: 'Developer', department: 'Engineering', salary: 60000, status: 'active' },
{ id: uuidv4(), name: 'Bob', position: 'Recruiter', department: 'HR', salary: 45000, status: 'active' }
]
const getAll = () => employees
const getById = (id) => employees.find(e => e.id === id)
const create = (data) => {
const newEmp = { id: uuidv4(), name: data.name, position: data.position, department: data.department, salary: data.salary, status: data.status }
employees.push(newEmp)
return newEmp
}
const update = (id, data) => {
employees = employees.map(e => e.id === id ? Object.assign({}, e, data) : e)
return getById(id)
}
const remove = (id) => {
employees = employees.filter(e => e.id !== id)
}
module.exports = { getAll, getById, create, update, remove }