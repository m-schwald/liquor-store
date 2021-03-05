import Liquor from "../models/liquor.model.js";

const liquorGet = (request, response) => {
  Liquor.find().then((bottle) => response.json(bottle));
};

const liquorPost = (request, response) => {
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
};

const liquorFind = (request, response) => {
  const liquorId = request.params.liquorId;
  Liquor.find({ _id: liquorId })
    .then((drink) => response.json(drink))
    .catch(() => response.json("Product not found"));
};

export { liquorGet, liquorPost, liquorFind };
