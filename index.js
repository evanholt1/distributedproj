const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoStore = require('connect-mongodb-session');
require('dotenv').config();

const router = require('./routes/router.js');

let MongoDBStore = mongoStore(session);

var store = new MongoDBStore({
  uri: "mongodb+srv://evan:evan@mern-xupmz.mongodb.net/test?retryWrites=true&w=majority",
  collection: 'distributedSessions'
});

mongoose.connect("mongodb+srv://evan:evan@mern-xupmz.mongodb.net/test?retryWrites=true&w=majority",
  {useNewUrlParser:true,useUnifiedTopology:true},
  function(err) {
  
  const app = express();

  app.use(express.static('public'));
  // session AFTER static to avoid multiple session creation
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.set('view engine', 'ejs');
  app.use(methodOverride('_method'));
  app.use(session({
    secret: '1234567875432',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,httpOnly:true, maxAge:1000*60*60},
    store:store,
  }));
  app.use(router);
  
  const port = process.env.PORT || 8080;

  app.listen(port);
});