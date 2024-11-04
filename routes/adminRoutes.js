const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware.js');

// User signup route
router.get('/admin/signup', (req, res) => res.render('adminsignup'));
router.post('/admin/signup',(req, res,next)=>{
    req.body.role='admin';
    next();
}, userController.userSignup);

// User login route
router.get('/admin/login', (req, res) => res.render('login'));
router.post('/admin/login', userController.userLogin);


router.get('/maintanence-menu',authMiddleware.checkRole('admin'),(req, res)=>{
    res.render('maintanenceMenu')
})

module.exports = router;
