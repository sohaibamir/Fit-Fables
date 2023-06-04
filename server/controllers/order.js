const Cart = require("../models/cart");
const { Order } = require("../models/order");

exports.createOrders = async (req, res) => {
  try {
    const { user } = req;
    const cart = await Cart.findOne({ userId: user._id });
    const newCart = {
      userId: cart.userId,
      cartItems: cart.cartItems,
    };
    const order = await Order.create(newCart);
    const deleteCart = await Cart.findByIdAndDelete(cart._id);

    return res.status(201).send({ message: cart });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { user } = req;

    const orders = await Order.find({ userId: user._id }).populate({
      path: "cartItems",
      populate: { path: "productId" },
    });
    return res.status(201).send({ data: orders });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(201).send({ data: orders });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error.message });
  }
};

