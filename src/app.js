const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/todos', require('./routes/todoRoutes'));

app.use((err, req, res, next) => {
    res.status(404).json({ message: 'API Not Found' });
});

app.use(require('./middleware/errorHandler'));

module.exports = app;