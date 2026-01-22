require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routes/router');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger.logger);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' }); // 404 Not Found
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
