//this file is to work with server connection
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

//Init Middleware
//allows to get data in req.body and use it
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/authenticateUser', require('./routes/api/authenticateUser'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(expres.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
