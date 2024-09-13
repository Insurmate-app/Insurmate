const service = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    const product = await service.createProduct(payload);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  const products = await service.getAllProducts();

  // Check if products is undefined or null
  if (!products) {
    return res.status(404).json({ message: "No products found" });
  }

  // Send a valid JSON response
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getProduct(id);

    if (!product) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await service.updateProduct(id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await service.deleteProduct(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;

    const product = await service.getProductByName(name);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const emailSender = async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    console.log("ok");
    const info = await emailService.sendEmail({ to, subject, text });
    res.status(200).send({ message: "Email sent successfully", info });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error sending email", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
};
