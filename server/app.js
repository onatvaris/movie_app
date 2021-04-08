const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const cors = require("cors");

app.use(cors());

//db
const db = require("./helpers/db")();
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(5000, () => {
  console.log("starting 5000 port");
  console.log("http://localhost:5000/grapql");
});
