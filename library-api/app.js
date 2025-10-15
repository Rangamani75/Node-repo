const express = require('express');
const { logger } = require('./middlewares/logger');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());
app.use(logger);

// routes
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

module.exports = app;