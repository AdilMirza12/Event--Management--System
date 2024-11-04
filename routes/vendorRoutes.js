const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const vendorController = require('../controllers/vendorController');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware.js');

// User signup route
router.get('/vendor/signup', (req, res) => res.render('vendorSignup'));
router.post('/vendor/signup', (req, res,next)=>{
    req.body.role='vendor';
    next();
},userController.userSignup);

// User login route
router.get('/vendor/login', (req, res) => res.render('vendorLogin'));
router.post('/vendor/login', userController.userLogin);

router.get('/logout', userController.userLogout);

router.get('/vendor-page',authMiddleware.checkRole('vendor'),(req, res)=>{
    res.render('vendorPage')
})

router.get('/vendor/add-item', authMiddleware.checkRole('vendor'), async (req, res) => {
    console.log(req.session.user);
  
    try {
      const products = await productController.getProductsByVendor(req.session.user.id);
      res.render('vendorAddItem', { products });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while retrieving products');
    }
  });

router.get('/vendor/:vendorId/products',authMiddleware.checkRole('user'),async (req, res)=>{
    const vendor=await vendorController.getVendor(req.params.vendorId);
    const products=await productController.getProductsByVendor(req.params.vendorId);
    res.render('vendorProducts',{vendor,products })
})

// POST /vendor/add-product
router.post('/vendor/add-product', authMiddleware.checkRole('vendor'), productController.addProduct);

// Delete product endpoint
router.delete('/vendor/delete-product/:id', authMiddleware.checkRole('vendor'), productController.deleteProduct);

module.exports = router;
