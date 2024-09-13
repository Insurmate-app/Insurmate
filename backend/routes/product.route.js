const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
} = require("../controllers/product.controller");

router.get("/getAll", getProducts);

router.get("/get/:id", getProduct);

router.get("/getByName/:name", getProductByName);

router.post("/create", createProduct);

// update a product
router.put("/update/:id", updateProduct);

// delete a product
router.delete("/delete/:id", deleteProduct);

module.exports = router;
