'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./cors-whitelist');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./middleware/error-handler')
const authRouter = require('./auth/auth-router')
const userRouter = require('./user/user-router')

const app = express();
app.use(express.json());

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'dev';

app.use(morgan(morganOption));

app.use(cors({origin: corsOptions}));
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use(errorHandler)

module.exports = app;