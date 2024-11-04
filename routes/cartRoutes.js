const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');


// Route to add product to cart
router.post('/cart/add', authMiddleware.checkRole('user'), cartController.addToCart);

// Route to view cart
// router.get('/cart', authMiddleware.checkRole('user'), cartController.viewCart);

// Route to remove product from cart
router.delete('/cart/remove/:productId', authMiddleware.checkRole('user'), cartController.removeFromCart);


router.get('/cart', authMiddleware.checkRole('user'), async (req, res) => {
    try {
        const cartItems = await cartController.viewCart(req, res); // Ensure this returns the data correctly
        res.render('cart', { cartItems }); // This renders the cart view with the items
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving cart items.');
    }
});
module.exports = router;
