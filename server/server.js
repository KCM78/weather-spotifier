const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
require('../passport');

const app = express();
const spotifyApi = new SpotifyWebApi();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new SpotifyStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:8888/callback',
},
(accessToken, refreshToken, profile, done) => {
  spotifyApi.setAccessToken(accessToken);
  done(null, profile);
}));

app.use(cookieSession({
  name: 'spotify-auth-session',
  keys: ['key1', 'key2'],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/public`))
  .use(cors());

app.get('/error', (req, res) => res.send('Unknown Error'));

app.get('/login', passport.authenticate(
  'spotify',
  { scope: ['user-read-private user-read-email user-read-playback-state playlist-modify-public playlist-modify-private'] },
));

app.get('/callback', passport.authenticate('spotify', { failureRedirect: '/error' }),
  (req, res) => res.redirect('http://localhost:4200'));

app.get('/api/getRecommendations', (req, res) => {
  spotifyApi.getRecommendations(req.query).then((data) => {
    const recommendations = data.body;
    res.status(200).send(recommendations);
  }, (err) => {
    console.log('Something went wrong', err);
    res.status(400).send(err);
  });
});

app.listen(8888, () => {
  console.log('Server listening on port 8888');
});
