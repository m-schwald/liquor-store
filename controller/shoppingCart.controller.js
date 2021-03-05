import ShoppingCart from "../models/shoppingCart.model.js";

const shoppingCartPost = (request, response) => {
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
};

const shoppingCartFind = (request, response) => {
  const customerId = request.params.customerId;
  ShoppingCart.find({ customerId: customerId })
    .then((item) => response.json(item))
    .catch((error) => response.json(error));
};

const shoppingCartAggregate = (request, response) => {
  const customerId = request.params.customerId;

  const prices = [];
  ShoppingCart.find({ customerId: customerId }).then((items) => {
    items.forEach((item) => prices.push(item.productPrice));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = prices.reduce(reducer);
    response.json(sum);
  });
};

const shoppingCartDelete = (request, response) => {
  const productId = request.params.productId;
  ShoppingCart.findOneAndDelete({ _Id: productId }).then((item) =>
    response.json(`${item.productName} was removed from shoppingcart.`)
  );
};

export {
  shoppingCartFind,
  shoppingCartPost,
  shoppingCartAggregate,
  shoppingCartDelete,
};
