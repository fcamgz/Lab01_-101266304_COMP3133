const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ApolloServer } = require("apollo-server-express");

const dotenv = require("dotenv");
dotenv.config();

const TypeDefs = require("./schema");
const Resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers,
});

const app = express();
app.use(bodyParser.json());
app.use("*", cors());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Success");
  })
  .catch((err) => console.log(err));

server.applyMiddleware({ app });

app.listen(5000, () =>
  console.log(
    `🚀 Server ready at http://localhost:${5000}${server.graphqlPath}`
  )
);
