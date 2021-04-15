require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = 'http://localhost:8888/callback';

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const app = express();

app.use(express.static(`${__dirname}/public`))
  .use(cors())
  .use(cookieParser());

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email user-read-playback-state';
  res.redirect(`https://accounts.spotify.com/authorize?${
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      state,
    })}`);
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${
      querystring.stringify({
        error: 'state_mismatch',
      })}`);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      json: true,
    };

    axios(authOptions)
      .then((authResponse) => {
        const { access_token } = authResponse.data;
        const { refresh_token } = authResponse.data;

        res.redirect(`http://localhost:4200/#${
          querystring.stringify({
            access_token,
            refresh_token,
          })}`);
      })
      .catch((error) => {
        console.error(error);
        res.redirect(`/#${
          querystring.stringify({
            error: 'invalid_token',
          })}`);
      });
  }
});

app.get('/refresh_token', (req, res) => {
  const refreshToken = req.query.refresh_token;
  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    json: true,
  };

  axios(authOptions)
    .then((authResponse) => {
      const accessToken = authResponse.data.access_token;
      res.send({
        access_token: accessToken,
      });
    });
});

console.log('Listening on 8888');
app.listen(8888);
