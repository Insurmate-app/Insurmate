const Product = require("../models/product.model");
const email = require("../services/email.service");
const modelMapper = require("lodash");

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
    // Define the DTO structure
    const productDto = modelMapper.pick(product, [
      "_id",
      "name",
      "qauntity",
      "price",
    ]);

    return productDto;
  } catch (error) {
    throw new Error("Error creating products: " + error.message);
  }
};

const getAllProducts = async () => {
  try {
    const products = await Product.find({});

    const productDtos = products.map((product) => {
      return modelMapper.pick(product, ["_id", "name", "qauntity", "price"]);
    });

    return productDtos;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

const getProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Define the DTO structure
    const productDto = modelMapper.pick(product, [
      "_id",
      "name",
      "qauntity",
      "price",
    ]);

    return productDto;
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

    const productDto = modelMapper.pick(product, [
      "_id",
      "name",
      "qauntity",
      "price",
    ]);

    return productDto;
  } catch (error) {
    throw new Error("Error retrieving product by name: " + error.message);
  }
};

const updateProduct = async (productId, payload) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, payload);
    console.log(updatedProduct);
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    const product = await getProduct(productId);

    return modelMapper.pick(product, ["_id", "name", "qauntity", "price"]);
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
