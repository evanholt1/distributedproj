const express = require('express');

const controller  = require ('../controllers/controller.js');
const joiSchema = require('../config/joi.js');

const router = express.Router();

// Get
router.get('/', controller.get_root);

router.get('/signup', controller.get_signup);

router.get('/login', controller.get_login);

router.get('/details', controller.get_details);

// POST
router.post('/signup', joiSchema.validateSignup, controller.post_signup);

router.post('/login', joiSchema.validateLogin, controller.post_login);

router.post('/logout', controller.post_logout);

// PUT
router.put('/updateAccount',controller.put_updateAccount);

// DELETE
router.delete('/deleteAccount',controller.delete_deleteAccount);

// 404 route
router.use(controller.get_notFound);

module.exports = router;

