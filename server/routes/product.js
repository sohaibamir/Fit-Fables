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
  updateProduct,
  deleteProduct,
  getLatestProducts
} = require("../controllers/product");

router.get("/products/search", getProductsBySearch);
router.get("/products/single/:id", getProductById);
router.get("/products/offer", getOfferProducts);
router.get("/products/category/:category", getAllProductsByCategory);
router.get(
  "/products/category/:category/:sub_category",
  getAllProductsBySubCategory
);
router.get("/products", getCategories);
router.post('/products/create', uploadProduct);
router.get('/products/all', getAllProducts);
router.put('/update/product/:id', updateProduct);
router.delete('/delete/product/:id', deleteProduct);
router.get('/products/latest', getLatestProducts);


module.exports = router;
