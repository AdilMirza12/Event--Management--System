const User = require('../models/User');
const Product = require('../models/Product'); // Ensure Product is also required

// In productController.js
exports.getProductsByVendor = async (vendorId) => {
    try {
      const products = await Product.findAll({
        where: { vendor_id: vendorId }, // Make sure the field name matches your database
        include: [
          {
            model: User,
            as: 'vendor',
            attributes: ['id', 'username', 'role'],
            where: { role: 'vendor' },
          },
        ],
      });
  
      return products; // Return the products directly
    } catch (err) {
      console.error(err);
      throw new Error('An error occurred while retrieving products');
    }
  };
  

// Controller function to add a product
exports.addProduct = async (req, res) => {
    const { name, price, image } = req.body;

    // Assuming you store the vendor's ID in the session after login
    const vendorId = req.session.user.id; // Use the ID stored in the session

    try {
        // Create a new product
        const newProduct = await Product.create({
            name,
            price,
            image,
            userId: vendorId, // Use vendor_id in SQL
        });

        res.redirect('/vendor/add-item'); 
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error adding product',
            error: err.message,
        });
    }
};


exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findOne({ where: { id: productId } });
      
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Check if the product belongs to the logged-in vendor
      if (product.userId !== req.session.user.id) {
        return res.status(403).send('You are not authorized to delete this product');
      }
  
      await Product.destroy({ where: { id: productId } });
      return res.status(200).send('Product deleted successfully');
    } catch (err) {
      console.error(err);
      return res.status(500).send('An error occurred while deleting the product');
    }
  };