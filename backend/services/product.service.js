const Product = require("../models/product.model");
const email = require("../services/email.service");

const createProduct = async (payload) => {
  try {
    const product = await Product.create(payload);
    if (product) {
      await email.sendEmail({
        to: "toearkar@protonmail.com",
        subject: "Hi from ExpressJS",
        text: "Hi there",
      });
    }
    return product;
  } catch (error) {
    throw new Error("Error creating products: " + error.message);
  }
};

const getAllProducts = async () => {
  try {
    return await Product.find({});
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

const getProduct = async (productId) => {
  try {
    return await Product.findById(productId);
  } catch (error) {
    throw new Error("Error retrieving product " + error.message);
  }
};

const getProductByName = async (name) => {
  try {
    const product = await Product.findOne({ name: name });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    throw new Error("Error retrieving product by name: " + error.message);
  }
};

const updateProduct = async (productId, payload) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, payload);
    if (updatedProduct) {
      const product = await getProduct(productId);
      return product;
    }
  } catch (error) {
    throw new Error("Error updating product " + error.message);
  }
};

const deleteProduct = async (productId) => {
  try {
    return await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error("Error deleting product " + error.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProductByName,
  getProduct,
  getAllProducts,
  deleteProduct,
};
