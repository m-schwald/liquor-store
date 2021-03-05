import Customer from "../models/customer.model.js";

const customerGet = (request, response) => {
  Customer.find().then((person) => response.json(person));
};

const customerPost = (request, response) => {
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
};

const customerFind = (request, response) => {
  const customerId = request.params.customerId;
  Customer.find({ _id: customerId })
    .then((person) => response.json(person))
    .catch(() => response.json("Customer not found"));
};

export { customerFind, customerPost, customerGet };
