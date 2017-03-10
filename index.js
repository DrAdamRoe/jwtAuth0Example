const express = require('express');
const expressJWT = require('express-jwt');

const app = express();

const server = app.listen(3000, () => {
  console.info(`Listening on port ${server.address().port}`);
});

app.use('/', express.static('./', {
  maxAge: '1d',
}));

// replace Secret and ClientId with you auth0 params
const authorization = expressJWT({
  secret: 'Secret',
  audience: 'ClientId',
});

app.get('/secretApi', authorization, (req, res) => {
  res.sendStatus(200);
});