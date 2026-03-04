const mongoose = require("mongoose");

let isConnected = false;

const connect = async () => {
  if (isConnected) {
    return;
  }

  await mongoose.connect(process.env.DB_DRIVER);
  isConnected = true;
};

module.exports = {
  connect,
};
