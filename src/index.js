const express = require('express');
const app = express();
require('./db/mongoose');
const User = require('./models/user');

const port = process.env.PORT || 3000;
app.use(express.json());

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
