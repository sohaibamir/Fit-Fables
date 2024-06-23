const mongoose = require("mongoose");
const Product = require("./models/product.js");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(`DB CONNECTION ERR ${error}`));

async function updateProduct() {
  try {
    const result = await Product.updateOne(
      { _id: "647752ff351ce8d19f49c660" },
      { $set: { quantity: 4000 } }
    );
    console.log(`${result.modifiedCount} product updated`);
  } catch (error) {
    console.error(`Error updating product: ${error}`);
  }
}

updateProduct();
