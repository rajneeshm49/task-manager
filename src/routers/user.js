const express = require('express');
const _ = require('lodash');
const router = new express.Router();

const User = require('../models/user');

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.patch('/users/:id', async (req, res) => {
  const paramKeys = _.keys(req.body);
  const allowedKeys = ['name', 'email', 'password'];
  const isValidOperation = _.every(paramKeys, paramKey =>
    _.includes(allowedKeys, paramKey)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid data sent for update' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send(user);
    }
    paramKeys.forEach(param => (user[param] = req.body[param]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).send();
    }
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
