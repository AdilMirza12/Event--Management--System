const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express(); 

require('dotenv').config();

// Middleware for session handling
app.use(session({
    secret:  process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 5 // 5 hour
    }
  }));
  
// Parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS templating
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


// Routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

const vendorRoutes = require('./routes/vendorRoutes');
app.use(vendorRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use(adminRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use(cartRoutes);

app.get('/' ,(req, res)=>{
    res.send('Home  working');
})


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});