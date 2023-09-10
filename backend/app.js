require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Joi, celebrate, errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const ERRORS = require('./utils/Errors');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/Logger');

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
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(30),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.link().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(30),
  }),
}), createUser);

app.use(() => {
  throw new ERRORS.NotFoundError('Requested resource not found');
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  const errorItem = err.code ? err : new ERRORS.InternalError();
  return res.status(errorItem.code).send({ message: errorItem.message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
