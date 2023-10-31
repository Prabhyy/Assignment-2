//importing mongoose package
const mongoose = require('mongoose');

//creating and exporting schema
const categoriesSchema = new mongoose.Schema({
    name: String,
});

const Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;