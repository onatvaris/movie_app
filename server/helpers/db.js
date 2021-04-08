const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.umnve.mongodb.net/${process.env.db_host}?retryWrites=true&w=majority`;

module.exports = () => {
  // const uri =
  //   "mongodb+srv://onat:benonat123@cluster0.umnve.mongodb.net/movie_app?retryWrites=true&w=majority";
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

  mongoose.connection.on("open", () => {
    console.log("connected.");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
