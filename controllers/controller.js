// File imports
const User = require('../models/User.js');
let controller = {};

// Get
controller.get_root = (req,res)=> {
  res.render('index');
}

controller.get_signup = (req,res)=> {
  res.render('signup');
}

controller.get_login = (req,res)=> {
  res.render('login');
}

controller.get_details = async (req,res)=> {
  if(req.session.isLoggedIn) {
    let user = await User.findOne({email:req.session.email});
    res.render('details',{
    user:user
  }); 
  } else {
    res.status(400).render('notFound');
  }
}

controller.get_notFound = (req,res)=> {
  res.render('notFound');
}

// ******************************
// POST
controller.post_signup = async(req,res)=> {
  // create new user 
  let newUser = new User(req.body);
  await newUser.save();
  res.status(202).send("Thanks For Signing Up!");
}

controller.post_login = async(req,res)=> {
  // create user session
  try {
    let user = await User.findOne({email:req.body.email,password:req.body.password});
    if(!user) {
      throw 'Email or Password Don\'t Match. Try Again!';
    }
    else {
      req.session.isLoggedIn = true;
      req.session.email = user.email;
      res.status(202).end();
    }
  }
  catch(e) {
    res.status(400).send(e);
  }
}

controller.post_logout = async (req,res)=> {
  if(req.session.isLoggedIn) {
    await req.session.destroy();
    res.redirect('/login');
  }
  else {
    res.end();
  }
};

// ******************************
// PUT
controller.put_updateAccount = async(req,res)=> {
  if(req.session.isLoggedIn) {
    let user = await User.findOne({email:req.session.email});
    if(!user) res.redirect('/login');
    else {
      if(req.body.email !== "") {
        user.email = req.body.email;
        req.session.email = req.body.email;
      }
      user.password = (req.body.password !== "") ? req.body.password : user.password;
      user.firstName = (req.body.firstName !== "") ? req.body.firstName : user.firstName;
      user.lastName = (req.body.lastName !== "") ? req.body.lastName : user.lastName;
    }
    await user.save();
    res.status(200).redirect('back');
  } else {
    res.end();
  }
}

// ******************************
// DELETE
controller.delete_deleteAccount = async(req,res)=> {
  if(req.session.isLoggedIn) {
    await User.findOneAndDelete({email:req.session.email});
    res.redirect('/');
  } else {
    res.end();
  }
}

module.exports =  controller;