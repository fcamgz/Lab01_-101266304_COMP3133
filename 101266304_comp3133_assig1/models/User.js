const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Duplicate Username is not allowed"],
  },
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  password: {
    type: String,
    required: true,
    minLength: 6,
    lowercase: true,
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicate Email is not allowed"],
    validate: function (value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    },
  },
  type: { type: String, enum: ["customer", "admin"] },
});

module.exports = mongoose.model("User", UserSchema);
