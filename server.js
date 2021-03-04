import express, { request, response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const connectionString = "mongodb://localhost:27017/liquorShop";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = express();
server.use(bodyParser.json());

// PRODUCTS
const liquorSchema = {
  name: String,
  price: Number,
  alc: Number,
  color: String,
};
const Liquor = mongoose.model("Liquor", liquorSchema);

server.get("/", (request, response) => {
  response.json({ status: "server is running" });
});

server.get("/liquors", (request, response) => {
  Liquor.find().then((bottle) => response.json(bottle));
});

server.post("/liquors", (request, response) => {
  const name = request.body.name;
  const price = request.body.price;
  const alc = request.body.alc;
  const color = request.body.color;

  const drink = new Liquor({
    name: name,
    price: price,
    alc: alc,
    color: color,
  });

  if (name && price && alc && color) {
    drink
      .save()
      .then((drink) => response.json(`${drink.name} was added`))
      .catch((error) => response.json(error));
  } else {
    response.json("ERROR: please enter all properties");
  }
});

server.get("/liquors/:liquorId", (request, response) => {
  const liquorId = request.params.liquorId;
  Liquor.find({ _id: liquorId })
    .then((drink) => response.json(drink))
    .catch(() => response.json("Product not found"));
});

//CUSTOMERS

const customerSchema = { firstName: String, lastName: String, email: String };
const Customer = mongoose.model("Customer", customerSchema);

server.get("/customers", (request, response) => {
  Customer.find().then((person) => response.json(person));
});

server.post("/customers", (request, response) => {
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const email = request.body.email;

  const person = new Customer({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });

  if (firstName && lastName && email) {
    person
      .save()
      .then((person) => response.json(`${person.firstName} is now a customer`))
      .catch((error) => response.json(error));
  } else {
    response.json("ERROR: please enter all properties");
  }
});

server.get("/customers/:customerId", (request, response) => {
  const customerId = request.params.customerId;
  Customer.find({ _id: customerId })
    .then((person) => response.json(person))
    .catch(() => response.json("Customer not found"));
});

//ShoppingCart

const shoppingCartSchema = {
  customerId: String,
  productName: String,
  productPrice: Number,
};
const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

server.post("/shoppingCart/:customerId", (request, response) => {
  const customerId = request.body.customerId;
  const productName = request.body.productName;
  const productPrice = request.body.productPrice;

  const cart = new ShoppingCart({
    customerId: customerId,
    productName: productName,
    productPrice: productPrice,
  });

  if (customerId && productPrice && productName) {
    cart
      .save()
      .then((cart) =>
        response.json(
          `${cart.productName} has been added to ${cart.customerId}'s shoppingcart.`
        )
      )
      .catch((error) => response.json(error));
  } else {
    response.json("ERROR: please enter all properties");
  }
});

server.get("/shoppingCart/:customerId", (request, response) => {
  const customerId = request.params.customerId;

  //const sum = request.params.productPrice.reduce();
  ShoppingCart.find({ customerId: customerId })
    .then((item) => response.json(item))
    .catch((error) => response.json(error));
});

server.listen(4000);
