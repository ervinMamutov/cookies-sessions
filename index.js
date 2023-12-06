import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';

// env configuration
dotenv.config();
const PORT = process.env.PORT || 3008;

// initialization express
const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// cookies

app.get('/set-cookies', (req, res) => {
  res.cookie('test', 'myCookieId1234', {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  });
  res.send('my cookie has been send');
});
app.get('/get-cookies', (req, res) => {
  const { test } = req.cookies;
  console.log(test);
  res.send('on get my cookie');
});
app.get('/clear-cookies', (req, res) => {
  res.clearCookie('test');
  res.send('Cookie removed');
});

//session
app.get('/set-session', (req, res) => {
  req.session.userId = '123456';
  res.send('a session has been created');
});

app.get('get-session', (req, res) => {
  if (req.session && req.session.userId) {
    const userId = req.session.userId;
    res.send(`Hello user with id ${userId}`);
  } else {
    res.send(`session is not valid`);
  }
});

app.get('clear-session', (req, res) => {
  req.destroy(err) => {
    if(err) {
      console.error(err);
    } else {
      res.send('Session destroy');
    }

  } 
}),

app.listen(PORT, () => {
  console.log(`Server is running to port ${PORT}`);
});
