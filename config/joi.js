const Joi = require('@hapi/joi');

const validation = {};

validation.signupSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(50),
  lastName: Joi.string().alphanum().min(3).max(50),
  email: Joi.string().required().max(100).email(),
  password: Joi.string().required().min(3).max(100),
  re_password: Joi.string().required().min(3).max(100).valid(Joi.ref('password')).messages({'any.only': 'Passwords Must Match!'})
 
});

validation.loginSchema = Joi.object({
  email: Joi.string().required().max(100).email(),
  password: Joi.string().required().min(3).max(100)
});

// Validation
validation.validateSignup = (req,res,next) => {
  const { error } = validation.signupSchema.validate(req.body);
  if(error) {
    res.send(error.details[0].message);
  } else {
    next();
  }
}

validation.validateLogin = (req,res,next) => {
  const { error } = validation.loginSchema.validate(req.body);
  if(error) {
    res.send(error.details[0].message);
  } else {
    next();
  }
}

module.exports =  validation;