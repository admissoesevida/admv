import db from '../models';
import express from 'express';

const User = db.user;
const router = express.Router();
const jwt = require('jsonwebtoken');

const { SECRET = 'supersecret', NODE_ENV } = process.env;

router.use((req, res, next) => {
  if (NODE_ENV === 'development') {
    next();
    return;
  }

  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ message: 'No token provided.' });

  jwt.verify(token, SECRET, function(error, decoded) {
    if (error)
      return res.status(401).send({ message: 'Failed to authenticate token.' });

    User.findByPk(decoded.id, { attributes: { exclude: ['password'] } })
      .then(user => {
        req.auth = user;
        next();
      })
      .catch(() =>
        res.status(500).send({
          message: 'There was a problem finding the user.'
        })
      );
  });
});

export default router;
