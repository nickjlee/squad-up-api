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
const gamesRouter = require('./games/games-router')
const squadsRouter = require('./squads/squads-router')

const app = express();
app.use(express.json());

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'dev';

app.use(morgan(morganOption));
app.use(cors({origin: corsOptions}));
app.use(helmet());

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/games', gamesRouter)
app.use('/api/squads', squadsRouter)

// app.use('/', (req, res) => {
//   res.send(`
//     <h1>SquadUp Server</h1>

//     <h2>This is the backend server for <a href='https://squadup.now.sh'>Squad Up</a></h2>
//     <h4>"Squad Up lets you find and connect with people and play the games you love"</h4>
//   `);
// });

app.use(errorHandler)

module.exports = app;