const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.userSignup = async (req, res) => {
  const { username, email, password, role} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await User.create({ username, email, password: hashedPassword, role});
    res.redirect('/login');
  } catch (err) {
    console.error('Error creating user:', err); // Log the error to the console
    res.status(400).send('Error creating user');
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send('Invalid password');
    }

       // Set user session
       req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
    if (user.role === 'admin') {
      res.redirect('/maintanence-menu');
      
    }else if (user.role === 'vendor') {
      res.redirect('/vendor-page');
      
    }else{
      res.redirect('/user-portal');
    }
  } catch (err) {
    res.status(500).send('Error logging in');
  }
};

exports.userLogout = (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        // Handle error during session destruction
        return res.status(500).send('Error logging out');
      }

      // Clear the cookie (optional, but recommended)
      res.clearCookie('connect.sid');

      // Redirect to the login page or homepage after logout
      res.redirect('/login');
    });
  } catch (err) {
    res.status(500).send('Error logging out');
  }
};

