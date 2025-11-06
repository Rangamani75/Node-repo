const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const { auth } = require('../middlewares/auth.middleware');


router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/me', auth, authCtrl.me);


module.exports = router;