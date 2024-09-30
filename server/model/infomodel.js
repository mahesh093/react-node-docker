const mongoose = require("mongoose");

const mongooseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter the name of user"],
    },
    mobile: {
      type: Number,
      require: true,
      default: 0,
    },
    details: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserData = mongoose.model("UserData", mongooseSchema);
module.exports = UserData;