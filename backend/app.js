const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const constants = require('./utils/constants');
const { CODE_NOT_FOUND } = require('./utils/constants');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
require('dotenv').config();

const { PORT = 5000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(requestLogger);

app.use(cors());
app.options('*', cors());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res) => {
  res.status(CODE_NOT_FOUND).send({ message: 'Requested resource not found' });
});
app.use(errorLogger);
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  const errorItem = constants.errorMap[err.name] || constants.errorMap[constants.internalError];
  return res.status(errorItem.code).send({ message: errorItem.message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
