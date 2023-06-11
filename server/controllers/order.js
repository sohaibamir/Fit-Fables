const Cart = require("../models/cart");
const { Order } = require("../models/order");
const Product = require("../models/product");

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

    const orders = await Order.find({ userId: user?._id }).populate({
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

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId });
    res.status(201).send({ data: order });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndUpdate({ _id: orderId }, { $set: { status: req.body.status } }, { new: true });
    res.status(201).send({ data: order });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getAllCustomerOrders = async (req, res) => {
  try {
    const { customerID } = req.params;
    // Get current date
    var currentDate = new Date();

    // Set the date to the last day of the current month
    var endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    endOfMonth.setHours(24, 59, 59, 999)


    // Set the date to six months earlier
    var sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1); // Set the day to 1
    sixMonthsAgo.setHours(0, 0, 0, 0)

    const customerOrders = await Order.find({ 'userId': customerID, 'createdAt': { '$gte': new Date(sixMonthsAgo), '$lte': new Date(currentDate) } }).sort({ 'createdAt': 1 });

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let dataForChart = []

    if (customerOrders.length > 0) {
      customerOrders.map((order) => {
        if (order.createdAt) {
          let date = new Date(order.createdAt);
          let month = months[date.getMonth()];
          let ind = dataForChart.findIndex((data) => data.name == month);
          let Total = 0;
          Total = order.totalPrice;
          if (ind == -1) {
            dataForChart.push({ name: month, Total: Total });
          } else {
            dataForChart[ind] =
            {
              name: dataForChart[ind].name,
              Total: (dataForChart[ind].Total + Total)
            }
          }
        }
      })
    }

    return res.status(201).send({ data: customerOrders, dataForChart: dataForChart });

  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error.message });
  }
};

