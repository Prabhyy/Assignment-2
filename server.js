//import express app and other dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRouter = require('./routes/product.routes');

//creating express app 
const app = express();
app.use(express.json());
app.use(cors());

//connecting to mongo db
mongoose.connect('mongodb+srv://p649:v0R0jpsW5bnabHAM@marketplace.czvodhu.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Marketplace'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
  console.log('Using database:', db.name); 
});


//default response to localhost:3000
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the DressStore application.' });
});
//adding the other routes ie for products
app.use('/', productRouter);


//hosting our application on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


