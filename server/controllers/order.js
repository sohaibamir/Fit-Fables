const Cart = require("../models/cart");
const { Order } = require("../models/order");
const User = require("../models/user");
const Product = require('../models/product');

exports.createOrders = async (req, res) => {
  try {
    const user = req.profile;
    const { totalPrice } = req.body;
    const cart = await Cart.findOne({ userId: user._id });

    const newOrder = {
      userId: user._id,
      cartItems: cart.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalPrice,
    };

    const order = await Order.create(newOrder);
    const deleteCart = await Cart.findByIdAndDelete(cart._id);

    return res.status(201).send({ message: order });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const user = req.profile;

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
    console.log(error);
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
    const order = await Order.findByIdAndUpdate(
      { _id: orderId },
      { $set: { status: req.body.status } },
      { new: true }
    );
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
    var endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    endOfMonth.setHours(24, 59, 59, 999);

    // Set the date to six months earlier
    var sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1); // Set the day to 1
    // sixMonthsAgo.setHours(0, 0, 0, 0)

    const customerOrders = await Order.find({
      userId: customerID,
      createdAt: { $gte: new Date(sixMonthsAgo), $lte: new Date(currentDate) },
    }).sort({ createdAt: 1 });

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dataForChart = [];

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
            dataForChart[ind] = {
              name: dataForChart[ind].name,
              Total: dataForChart[ind].Total + Total,
            };
          }
        }
      });
    }

    return res
      .status(201)
      .send({ data: customerOrders, dataForChart: dataForChart });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.getSixMonthsRevenue = async (req, res) => {
  try {
    // Get current date
    var currentDate = new Date();

    // Set the date to the last day of the current month
    var endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    endOfMonth.setHours(24, 59, 59, 999);

    // Set the date to six months earlier
    var sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1); // Set the day to 1
    // sixMonthsAgo.setHours(0, 0, 0, 0)

    const customerOrders = await Order.find({
      createdAt: { $gte: new Date(sixMonthsAgo), $lte: new Date(currentDate) },
    }).sort({ createdAt: 1 });

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dataForChart = [];

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
            dataForChart[ind] = {
              name: dataForChart[ind].name,
              Total: dataForChart[ind].Total + Total,
            };
          }
        }
      });
    }

    // get todays sale
    let todayDateStart = new Date(Date.now());
    todayDateStart.setHours(0, 0, 0, 0);

    let todayDateEnd = new Date(Date.now());
    todayDateEnd.setHours(24, 59, 59, 999);

    const todayOrders = await Order.find({
      createdAt: {
        $gte: new Date(todayDateStart),
        $lte: new Date(todayDateEnd),
      },
    }).sort({ createdAt: 1 });

    let todaySales = todayOrders.reduce((acc, current) => {
      return acc + current.totalPrice;
    }, 0);

    // get this week sale
    let weekStart = new Date(Date.now());
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);

    let weekEnd = new Date(Date.now());
    weekEnd.setHours(24, 59, 59, 999);

    const weekOrders = await Order.find({
      createdAt: { $gte: new Date(weekStart), $lte: new Date(weekEnd) },
    }).sort({ createdAt: 1 });

    let weekSales = weekOrders.reduce((acc, current) => {
      return acc + current.totalPrice;
    }, 0);

    // get this month sale
    let monthStart = new Date(Date.now());
    monthStart.setDate(monthStart.getDate() - 30);
    monthStart.setHours(0, 0, 0, 0);

    let monthEnd = new Date(Date.now());
    monthEnd.setHours(24, 59, 59, 999);

    const monthOrders = await Order.find({
      createdAt: { $gte: new Date(monthStart), $lte: new Date(monthEnd) },
    }).sort({ createdAt: 1 });

    let monthSales = monthOrders.reduce((acc, current) => {
      return acc + current.totalPrice;
    }, 0);

    let totalOrders = await Order.countDocuments();

    let totalUsers = await User.countDocuments()

    const totalOrdersInDB = await Order.find();
    let totalOrdersAmount = totalOrdersInDB.reduce((acc, current) => { return acc + current.totalPrice }, 0)


    return res.status(201).
      send({
        dataForChart: dataForChart,
        todaySales: todaySales ? todaySales : 0,
        weekSales: weekSales ? weekSales : 0,
        monthSales: monthSales ? monthSales : 0,
        totalOrders, totalUsers, totalOrdersAmount: totalOrdersAmount ? totalOrdersAmount : 0
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.getProductsOfSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId });

    if (order) {
      let arrLength = order?.cartItems?.length;
      let productsArr = [];
      order?.cartItems?.forEach(async (item) => {
        const product = await Product.findOne({ _id: item?.productId });
        productsArr.push(product);

        if (arrLength == productsArr?.length) {
          res.status(201).send({ products: productsArr });
        }
      });
    }
    else {
      res.status(500).send({ message: "order id is incorrect" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
