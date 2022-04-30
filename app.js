const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { notFound, errorStack } = require('./app/middlewares/errorHandlers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

const routers = require('./routes');
routers(app);

app.use(notFound);
app.use(errorStack);

module.exports = app;
