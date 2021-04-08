const mongoose = require("mongoose");

module.exports = () => {
  const uri =
    "mongodb+srv://onat:benonat123@cluster0.umnve.mongodb.net/movie_app?retryWrites=true&w=majority";
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

  mongoose.connection.on("open", () => {
    console.log("connected.");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
