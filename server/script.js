const mongoose = require("mongoose");
const User = require("./models/user.js");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(`DB CONNECTION ERR ${error}`));

async function addGender() {
  try {
    const result = await User.updateMany({}, { $set: { gender: "male" } });
    console.log(`${result.modifiedCount} users updated`);
  } catch (error) {
    console.error(`Error updating users: ${error}`);
  }
}

addGender();
