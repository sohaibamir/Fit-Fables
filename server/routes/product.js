const express = require("express");
const router = express.Router();

const {
  getProductById,
  getAllProductsByCategory,
  getCategories,
  getAllProductsBySubCategory,
  getProductsBySearch,
} = require("../controllers/product");

router.get("/search", getProductsBySearch);
router.get("/single/:id", getProductById);
router.get("/category/:category", getAllProductsByCategory);
router.get("/category/:category/:sub_category", getAllProductsBySubCategory);
router.get("/", getCategories);

module.exports = router;
