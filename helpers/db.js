const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb://onat:10.Ar7072@cluster0.umnve.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
  );

  mongoose.connection.on("open", () => {
    console.log("connected.");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
