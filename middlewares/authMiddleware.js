const User = require('../models/User');

exports.checkRole = (role) => {
  return async (req, res, next) => {
    try {
      // Check if the session exists and user data is available
      if (!req.session || !req.session.user) {
       // Redirect to the login page if session is not available
       return res.redirect('/login'); // Adjust the route according to your application's structure

      }

      // Log session data for debugging
      console.log(req.session);

      // Fetch user from the database
      const user = await User.findOne({ where: { email: req.session.user.email } });
      if (!user) {
        const err = new Error('Not authorized!');
        err.status = 401;
        return next(err);
      }

      // Check if the user's role matches the required role
      if (role !== user.role) {
        const err = new Error('Not authorized!');
        err.status = 401;
        return next(err);
      }

      // User is authorized, proceed to the next middleware
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
