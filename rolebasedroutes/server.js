const express = require('express')
const app = express()
const employeeRoutes = require('./routes/employeeRoutes')
const logger = require('./middleware/loggerMiddleware')
app.use(express.json())
app.use(logger)
app.use('/employees', employeeRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))