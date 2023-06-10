const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    phone: { type: Number },
    address: { type: String },
    gender: { type: String },
    role: {
      type: String,
      enum: ["user", "admin", "doctor"],
      default: "user",
    },
    image: String,
    authType: {
      type: String,
      default: "email-password",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  let hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
