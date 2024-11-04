const User = require('../models/User');

exports.getVendors = async (req, res) => {
  try {
    const vendors = await User.findAll({ where: { role: 'vendor' } });
    if (!vendors) {
      return res.status(404).send('Vendors not found');
    }
    return vendors;
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred while retrieving vendors');
  }
};

exports.getVendor = (vendorId) => async (req, res) => {
  try {
    const vendor = await User.findOne({ where: { role: 'vendor', id: vendorId } });
    if (!vendor) {
      return res.status(404).send('Vendor not found');
    }
    return vendor;
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred while retrieving the vendor');
  }
};
