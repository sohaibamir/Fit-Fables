const Doctor = require("../models/doctor");
const user = require("../models/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Product = require("../models/product");
const { Order } = require("../models/order");

const newJWTToken = (user) => {
  const { name, gender, email, username, _id } = user;
  return jwt.sign({ name, gender, email, username, _id }, JWT_SECRET_KEY);
};

exports.signup = async (req, res) => {
  try {
    let newUser = req.body;
    console.log(newUser);
    let user = await User.findOne({ email: newUser.email });
    console.log(user);
    if (user) {
      return res
        .status(400)
        .send({ message: "User Already Exists", status: 400 });
    } else {
      user = await User.create(newUser);

      return res
        .status(201)
        .send({ message: "User Created Successfully", status: 201 });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, status: 500 });
  }
};

exports.login = async (req, res) => {
  try {
    let loginUser = req.body;

    const user = await User.findOne({ email: loginUser.email });

    if (!user)
      return res
        .status(404)
        .send({ message: "Invalid Credentials", status: 404 });

    const match = user.checkPassword(loginUser.password);
    if (!match)
      return res
        .status(404)
        .send({ message: "Invalid Credentials", status: 404 });
    delete user.password;
    const token = newJWTToken(user);
    user.authType = undefined;
    user.updatedAt = undefined;
    user.createdAt = undefined;
    user.password = undefined;
    return res
      .status(200)
      .send({ message: "User Logged In", user, token, status: 200 });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.checkLoggedIn = (req, res) => {
  const { user } = req;

  if (user) {
    return res.send({
      status: "Success",
      data: user,
    });
  } else {
    return res.status(400).send({
      status: "Error",
      message: "User Not Logged In",
    });
  }
};

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "User not found",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    if (users.length == 0) {
      return res.status(400).json({
        error: "Users not found",
      });
    }
    return res.status(200).send({
      data: users,
    });
  } catch (err) {
    return res.status(400).json({
      error: "User not found",
    });
  }
};

exports.getUserByIdAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    return res.status(200).json({
      data: user,
    });
    next();
  } catch (err) {
    return res.status(400).json({
      error: "User not found",
    });
  }
};

exports.updateAppointmentHistory = async (req, res) => {
  try {
    const { userId, doctorId } = req.params;
    let history = {};
    const userData = await user.findOne({ _id: userId });
    const doctor = await Doctor.findOne({ _id: doctorId });
    const {
      appointmentHistory,
      _id,
      img1,
      img2,
      designation,
      timings,
      days,
      price,
      name,
      email,
      password,
      phone,
      ...remData
    } = doctor;

    history = {
      doctorName: name,
      timings,
      fees: price,
      phone,
      status: "Remaining",
      ...history,
    };
    const updatedUser = await user.findByIdAndUpdate(
      { _id: userId },
      { $set: { appointmentHistory: history } },
      { new: true }
    );

    res.status(201).send({ data: updatedUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

const calculateMeanAndStdDevByProduct = async (params) => {
  try {
    const productId = params.productId;

    const orders = await Order.find({
      "cartItems.productId": productId,
    }).populate("cartItems.productId");

    let quantities = [];
    let seasonDemand = { winter: [], spring: [], summer: [], fall: [] };
    let dayOfWeekDemand = [[], [], [], [], [], [], []];

    orders.forEach((order) => {
      const orderSeason = getOrderSeason(order.createdAt);
      const dayOfWeek = order.createdAt.getDay();
      order.cartItems.forEach((item) => {
        if (item.productId?._id.toString() === productId.toString()) {
          quantities.push(item.quantity);
          seasonDemand[orderSeason].push(item.quantity);
          dayOfWeekDemand[dayOfWeek].push(item.quantity);
        }
      });
    });

    const { mean, stdDev } = calculateMeanAndStdDevFromQuantities(quantities);
    console.log(`Mean: ${mean}, StdDev: ${stdDev}`);

    const seasonalityFactor = calculateSeasonalityFactor(seasonDemand);
    const dayOfWeekFactor = calculateDayOfWeekFactor(dayOfWeekDemand);

    return { mean, stdDev, seasonalityFactor, dayOfWeekFactor };
  } catch (error) {
    console.error("Error calculating mean and stdDev:", error);
    return { mean: 0, stdDev: 0, seasonalityFactor: {}, dayOfWeekFactor: [] };
  }
};

const calculateMeanAndStdDevByCategory = async (params, filter) => {
  try {
    let products;
    if (filter === "category") {
      const category = params.category;
      products = await Product.find({ category: category });
    } else if (filter === "sub_category") {
      const sub_category = params.sub_category;
      products = await Product.find({ sub_category: sub_category });
    } else if(filter === "manufacturer") {
      const manufacturer = params.manufacturer;
      products = await Product.find({ manufacturer: manufacturer });
    }

    const productIds = products.map((product) => product._id.toString());
    console.log("product IDs", productIds);

    const orders = await Order.find({
      "cartItems.productId": { $in: productIds },
    }).populate("cartItems.productId");

    let quantities = [];
    let seasonDemand = { winter: [], spring: [], summer: [], fall: [] };
    let dayOfWeekDemand = [[], [], [], [], [], [], []];

    orders.forEach((order) => {
      const orderSeason = getOrderSeason(order.createdAt);
      const dayOfWeek = order.createdAt.getDay();
      order.cartItems.forEach((item) => {
        if (productIds.includes(item.productId?._id.toString())) {
          quantities.push(item.quantity);
          seasonDemand[orderSeason].push(item.quantity);
          dayOfWeekDemand[dayOfWeek].push(item.quantity);
        }
      });
    });
    console.log("Working2");

    const { mean, stdDev } = calculateMeanAndStdDevFromQuantities(quantities);
    console.log(`Mean: ${mean}, StdDev: ${stdDev}`);

    const seasonalityFactor = calculateSeasonalityFactor(seasonDemand);
    const dayOfWeekFactor = calculateDayOfWeekFactor(dayOfWeekDemand);

    return { mean, stdDev, seasonalityFactor, dayOfWeekFactor };
  } catch (error) {
    console.error("Error calculating mean and stdDev:", error);
    return { mean: 0, stdDev: 0, seasonalityFactor: {}, dayOfWeekFactor: [] };
  }
};

const calculateMeanAndStdDevByFilter = async (params, filterType) => {
  try {
    const { productId } = params;
    let filter;

    if (filterType === "gender") {
      const usersByGender = await User.find({ gender: params.gender }).select(
        "_id"
      );
      const userIds = usersByGender.map((user) => user._id);
      filter = { userId: { $in: userIds }, "cartItems.productId": productId };
    } else if (filterType === "city") {
      const usersByCity = await User.find({ city: params.city }).select("_id");
      const userIds = usersByCity.map((user) => user._id);
      filter = { userId: { $in: userIds }, "cartItems.productId": productId };
    }

    const orders = await Order.find(filter).populate("cartItems.productId");

    let quantities = [];
    let seasonDemand = { winter: [], spring: [], summer: [], fall: [] };
    let dayOfWeekDemand = [[], [], [], [], [], [], []];

    orders.forEach((order) => {
      const orderSeason = getOrderSeason(order.createdAt);
      const dayOfWeek = order.createdAt.getDay();
      order.cartItems.forEach((item) => {
        if (item.productId?._id.toString() === productId.toString()) {
          quantities.push(item.quantity);
          seasonDemand[orderSeason].push(item.quantity);
          dayOfWeekDemand[dayOfWeek].push(item.quantity);
        }
      });
    });

    const { mean, stdDev } = calculateMeanAndStdDevFromQuantities(quantities);
    console.log(`Mean: ${mean}, StdDev: ${stdDev}`);

    const seasonalityFactor = calculateSeasonalityFactor(seasonDemand);
    const dayOfWeekFactor = calculateDayOfWeekFactor(dayOfWeekDemand);

    return { mean, stdDev, seasonalityFactor, dayOfWeekFactor };
  } catch (error) {
    console.error(`Error calculating mean and stdDev by ${filterType}:`, error);
    return { mean: 0, stdDev: 0, seasonalityFactor: {}, dayOfWeekFactor: [] };
  }
};

const calculateMeanAndStdDevFromQuantities = (quantities) => {
  if (quantities.length === 0) {
    return { mean: 0, stdDev: 0 };
  }

  const mean =
    quantities.reduce((acc, val) => acc + val, 0) / quantities.length;
  const variance =
    quantities.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    quantities.length;
  const stdDev = Math.sqrt(variance);

  return { mean, stdDev };
};

const calculateSeasonalityFactor = (seasonDemand) => {
  const seasonalityFactor = {};
  Object.keys(seasonDemand).forEach((season) => {
    const avgDemand =
      seasonDemand[season].reduce((acc, val) => acc + val, 0) /
        seasonDemand[season].length || 0;
    seasonalityFactor[season] = avgDemand;
  });

  const overallAverage =
    Object.values(seasonalityFactor).reduce((acc, val) => acc + val, 0) /
    Object.values(seasonalityFactor).length;
  Object.keys(seasonalityFactor).forEach((season) => {
    seasonalityFactor[season] /= overallAverage;
  });

  return seasonalityFactor;
};

const calculateDayOfWeekFactor = (dayOfWeekDemand) => {
  const dayOfWeekFactor = dayOfWeekDemand.map((demandArray) => {
    const avgDemand =
      demandArray.reduce((acc, val) => acc + val, 0) / demandArray.length || 0;
    return avgDemand;
  });

  const overallDayOfWeekAverage =
    dayOfWeekFactor.reduce((acc, val) => acc + val, 0) / dayOfWeekFactor.length;
  for (let i = 0; i < dayOfWeekFactor.length; i++) {
    dayOfWeekFactor[i] /= overallDayOfWeekAverage;
  }

  return dayOfWeekFactor;
};

const normalRandom = () => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

const monteCarloSimulation = async (params, initialInventory, days = 30) => {
  let mean, stdDev, seasonalityFactor, dayOfWeekFactor;

  if (params.productId && params.gender) {
    ({ mean, stdDev, seasonalityFactor, dayOfWeekFactor } =
      await calculateMeanAndStdDevByFilter(params, "gender"));
  } else if (params.productId && params.city) {
    ({ mean, stdDev, seasonalityFactor, dayOfWeekFactor } =
      await calculateMeanAndStdDevByFilter(params, "city"));
  } else if (params.productId) {
    ({ mean, stdDev, seasonalityFactor, dayOfWeekFactor } =
      await calculateMeanAndStdDevByProduct(params));
  } else if (params.category) {
    ({ mean, stdDev, seasonalityFactor, dayOfWeekFactor } =
      await calculateMeanAndStdDevByCategory(params, "category"));
    } else if (params.sub_category) {
      ({ mean, stdDev, seasonalityFactor, dayOfWeekFactor } =
        await calculateMeanAndStdDevByCategory(params, "sub_category"));
      } else if (params.manufacturer) {
        ({ mean, stdDev, seasonalityFactor, dayOfWeekFactor } =
          await calculateMeanAndStdDevByCategory(params, "manufacturer"));
      }  
  const seasonFactor = seasonalityFactor[params.season];
  let inventoryLevels = [];
  let stockoutEvents = [];
  let currentInventory = initialInventory;

  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() + i * 86400000);
    const dayOfWeek = date.getDay();

    const dailyVariation = normalRandom() * 0.05; // +/- 5% variation
    const noise = normalRandom() * stdDev; // Adding realistic daily noise

    const demand =
      Math.max(
        0,
        mean *
          seasonFactor *
          dayOfWeekFactor[dayOfWeek] *
          (1 + dailyVariation) +
          noise
      ) * stdDev;

    currentInventory -= demand;
    if (currentInventory < 0) {
      stockoutEvents.push({
        date: date.toISOString().split("T")[0],
        demand,
      });
      currentInventory = 0;
    }
    inventoryLevels.push(Math.max(0, currentInventory));
  }

  return { inventoryLevels, stockoutEvents, stdDev };
};

const getOrderSeason = (date) => {
  const month = date.getMonth() + 1;
  switch (month) {
    case 12:
    case 1:
    case 2:
      return "winter";
    case 3:
    case 4:
    case 5:
      return "spring";
    case 6:
    case 7:
    case 8:
      return "summer";
    case 9:
    case 10:
    case 11:
      return "fall";
    default:
      return "unknown";
  }
};

exports.projectedInventory = async (req, res) => {
  const { season, productId, category, city, gender, sub_category, manufacturer, days = 30 } = req.query;

  const params = {
    season: season || undefined,
    productId: productId || undefined,
    category: category || undefined,
    city: city || undefined,
    gender: gender || undefined,
    sub_category: sub_category || undefined,
    manufacturer: manufacturer || undefined,
  };

  try {
    let product, quantity;
    if (params.productId) {
      product = await Product.findById(productId);
      quantity = product.quantity;
      console.log("HERE IN PRODUCT");
    } else if (params.category) {
      product = await Product.find({ category: category });
      quantity = product.reduce((acc, product) => acc + product.quantity, 0);
      console.log("HERE IN CATEGORY");
    } else if (params.sub_category) {
      product = await Product.find({ sub_category: sub_category });
      quantity = product.reduce((acc, product) => acc + product.quantity, 0);
    } else if (params.manufacturer) {
      product = await Product.find({ manufacturer: manufacturer });
      quantity = product.reduce((acc, product) => acc + product.quantity, 0);
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const { inventoryLevels, stockoutEvents, stdDev } =
      await monteCarloSimulation(params, quantity, parseInt(days));

    const leadTime = 5;
    const averageDailyDemand =
      inventoryLevels.reduce((acc, val) => acc + val, 0) / days;
    const safetyStock = stdDev * Math.sqrt(leadTime);
    const reorderPoint = averageDailyDemand * leadTime + safetyStock;

    const inventoryData = {
      product_id: product._id,
      title: product.title,
      projected_inventory: inventoryLevels.map((level, index) => ({
        date: new Date(Date.now() + index * 86400000)
          .toISOString()
          .split("T")[0],
        inventory_level: level,
      })),
      stockout_events: stockoutEvents,
      reorder_point: reorderPoint,
    };

    res.json(inventoryData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
