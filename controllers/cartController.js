const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add product to cart
exports.addToCart = async (req, res) => {
    const { productId, vendorId } = req.body;
    const userId = req.session.userId; // Assuming you have user ID stored in session
  
    try {
      // Check if product already exists in the cart for the user
      let cartItem = await Cart.findOne({ where: { userId, productId } });
  
      if (cartItem) {
        // Update the quantity if it exists
        cartItem.quantity += 1; // Increment by 1 or whatever logic you need
        await cartItem.save();
      } else {
        // Add new item to cart
        await Cart.create({ userId, productId, vendorId, quantity: 1 });
      }
  
      res.redirect('/cart'); // Redirect to cart page after adding
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).send("Internal Server Error");
    }
};

exports.viewCart = async (req, res) => {
    const userId = req.session.user.id;
    console.log(`Fetching cart for user ID: ${userId}`);
    try {
        const cartItems = await Cart.findAll({
            where: { userId }, // Ensure this is the correct column
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price', 'image'],
                },
            ],
        });
        console.log('Cart items retrieved:', cartItems);
        return cartItems; // Respond with cart items as JSON
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error occurred while retrieving the cart');
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.session.user.id;
  const { productId } = req.params; // Ensure productId comes from params

  try {
    const result = await Cart.destroy({
      where: { userId, productId },
    });

    if (result === 0) {
      return res.status(404).send('Product not found in cart');
    }

    return res.status(200).send('Product removed from cart');
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred while removing from cart');
  }
};
