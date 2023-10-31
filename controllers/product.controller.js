//importing the product model
const Product = require('../models/product.model.js');

//creating product controller 
const productController = {

  //method to get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Cannot get all products' });
    }
  },

  //method to get products with a specific id
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Oops!! Product you are looking for is not present' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Cannot get the product' });
    }
  },

  //method to create a new product 
  createProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Cannot create a new product' });
    }
  },

  //method to update a product with specific id 
  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Cannot update the product' });
    }
  },

  //method to delete products with specific id
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndRemove(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deletion was successful' });
    } catch (error) {
      res.status(500).json({ error: 'Cannot delete the product' });
    }
  },

  //method to delete all products
  deleteAllProducts: async (req, res) => {
    try {
      await Product.deleteMany({});
      res.json({ message: 'All products deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Cannot delete all products' });
    }
  },

  //method to get all products with matching keyword present in description
  getProductsByName: async (req, res) => {
    try {
      const { name } = req.query;
      const products = await Product.find({ name: { $regex: name, $options: 'i' } });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Cannot find products' });
    }
  },
};

//exporting the controller to be used in the routes section
module.exports = productController;
