const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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
    return res
      .status(200)
      .send({ message: "User Logged In", token, status: 200 });
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
