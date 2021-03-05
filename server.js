import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

//import controllers
import {
  liquorGet,
  liquorPost,
  liquorFind,
} from "./controller/liquor.controller.js";

import {
  customerFind,
  customerGet,
  customerPost,
} from "./controller/customer.controller.js";

import {
  shoppingCartAggregate,
  shoppingCartFind,
  shoppingCartPost,
  shoppingCartDelete,
} from "./controller/shoppingCart.controller.js";

import {
  wishlistDelete,
  wishlistFind,
  wishlistPost,
} from "./controller/wishlist.controller.js";

//Server
const connectionString = "mongodb://localhost:27017/liquorShop";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = express();
server.use(bodyParser.json());

server.get("/", (request, response) => {
  response.json({ status: "server is running" });
});

// PRODUCTS
server.get("/liquors", liquorGet);
server.post("/liquors", liquorPost);
server.get("/liquors/:liquorId", liquorFind);

//CUSTOMERS
server.get("/customers", customerGet);
server.post("/customers", customerPost);
server.get("/customers/:customerId", customerFind);

//ShoppingCart
server.post("/shoppingCart/:customerId", shoppingCartPost);
server.get("/shoppingCart/:customerId", shoppingCartFind);
server.delete("/shoppingCart/:customerId", shoppingCartDelete);
//ShoppingCart Sum
server.get("/shoppingCartSum/:customerId", shoppingCartAggregate);

//Wishlist
server.post("/wishlist/:customerId", wishlistPost);
server.get("/wishlist/:customerId", wishlistFind);
server.delete("/wishlist/:customerId", wishlistDelete);

server.listen(4000);
