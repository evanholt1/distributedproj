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
  uri: process.env.DB_CONNECT,
  collection: 'distributedSessions'
});

mongoose.connect(process.env.DB_CONNECT,
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
  
  const PORT = process.env.PORT || 5000;

  app.listen(PORT,console.log(`Server Started on Port ${PORT}`));
});