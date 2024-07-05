// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../Controller/usercontroller');


// User registration route
router.post('/register', userController.registerUser);
router.post('/login', userController.userLogin);
router.post('/donate',userController.userdon);
router.post('/request',userController.userRequest)
module.exports = router;