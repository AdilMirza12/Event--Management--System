const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middlewares/authMiddleware.js');

// User signup route
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup',(req, res,next)=>{
    req.body['role']='user';
    next();
}, userController.userSignup);

// User login route
router.get('/login', (req, res) => res.render('login'));
router.post('/login', userController.userLogin);

router.get('/logout', userController.userLogout);

router.get('/user-portal',authMiddleware.checkRole('user'),(req, res)=>{
    res.render('userPortal')
})

router.get('/user/vendors',authMiddleware.checkRole('user'),async (req, res)=>{
    const vendors=await vendorController.getVendors();
    res.render('vendorList',{vendors})
})


module.exports = router;
