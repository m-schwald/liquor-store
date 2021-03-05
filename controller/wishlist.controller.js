import Wishlist from "../models/wishlist.model.js";

const wishlistPost = (request, response) => {
  const customerId = request.body.customerId;
  const productName = request.body.productName;
  const productPrice = request.body.productPrice;

  const wishlist = new Wishlist({
    customerId: customerId,
    productName: productName,
    productPrice: productPrice,
  });

  if (customerId && productPrice && productName) {
    wishlist
      .save()
      .then((wishlist) =>
        response.json(
          `${wishlist.productName} has been added to ${wishlist.customerId}'s wishlist.`
        )
      )
      .catch((error) => response.json(error));
  } else {
    response.json("ERROR: please enter all properties");
  }
};

const wishlistFind = (request, response) => {
  const customerId = request.params.customerId;

  //const sum = request.params.productPrice.reduce();
  Wishlist.find({ customerId: customerId })
    .then((item) => response.json(item))
    .catch((error) => response.json(error));
};

const wishlistDelete = (request, response) => {
  const productId = request.params.productId;
  Wishlist.findOneAndDelete({ _Id: productId }).then((item) =>
    response.json(`${item.productName} was removed from wishlist.`)
  );
};

export { wishlistFind, wishlistPost, wishlistDelete };
