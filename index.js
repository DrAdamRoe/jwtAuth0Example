const express = require('express');
const expressJWT = require('express-jwt');
require('dotenv').config()

const app = express();

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
  var CLIENT_ID = process.env.CLIENT_ID
  console.log(CLIENT_ID)
});

app.use('/', express.static('./', {
  maxAge: '1d',
}));

// replace Secret and ClientId with you auth0 params
const authorization = expressJWT({
  secret: process.env.SERVER_SECRET,
  audience: process.env.CLIENT_ID,
});

app.get('/secretApi', authorization, (req, res) => {
  res.sendStatus(200);
  res.send('logged in')
});