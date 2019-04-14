import db from '../models';
import express from 'express';

const User = db.user;
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { SECRET = 'supersecret' } = process.env;

router.post('/register', (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
    .then(user => {
      const { id, email, name } = user;
      const token = jwt.sign({ id, email, name }, SECRET, {
        expiresIn: 24 * 60 * 60
      });

      res.status(200).send({ auth: true, token: token });
    })
    .catch(error =>
      res.status(500).send({
        message: 'There was a problem registering the user.',
        error
      })
    );
});

router.get('/me', (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, SECRET, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });

    User.findByPk(decoded.id, { attributes: { exclude: ['password'] } })
      .then(user => res.status(200).send(user))
      .catch(error =>
        res.status(500).send({
          message: 'There was a problem finding the user.',
          error
        })
      );
  });
});

router.post('/login', function(req, res) {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) return res.status(401);

      var token = jwt.sign({ id: user._id }, SECRET, {
        expiresIn: 24 * 60 * 60
      });

      res.status(200).send({ token });
    })
    .catch(() => res.status(500));
});

export default router;
