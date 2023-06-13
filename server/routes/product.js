const express = require("express");
const router = express.Router();

const {
  getProductById,
  getAllProductsByCategory,
  getCategories,
  getAllProductsBySubCategory,
  getProductsBySearch,
  uploadProduct,
  getAllProducts,
  getOfferProducts,
  getLatestProducts,
  getMostSellingProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router.get("/products/search", getProductsBySearch);
router.get("/products/single/:id", getProductById);
router.get("/products/offer", getOfferProducts);
router.get("/products/latest", getLatestProducts);
router.get("/products/mostselling", getMostSellingProducts);
router.get("/products/category/:category", getAllProductsByCategory);
router.get(
  "/products/category/:category/:sub_category",
  getAllProductsBySubCategory
);
router.get("/products", getCategories);
router.post("/products/create", uploadProduct);
router.get("/products/all", getAllProducts);
router.put("/update/product/:id", updateProduct);
router.delete("/admin/delete/product/:productId", deleteProduct);

module.exports = router;
