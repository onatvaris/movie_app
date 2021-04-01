const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

//db
const db = require("./helpers/db")();
app.use("/grapql", graphqlHTTP({ schema, graphiql: true }));

app.listen(5000, () => {
  console.log("deneme");
});
