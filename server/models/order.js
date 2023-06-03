const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    cartItems: [
      {
        productId: { type: ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    status:{
      type:String,
      enum:["Pending","In-Process","Delivered"],
      default:"Pending"
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
};
