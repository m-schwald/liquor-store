import mongoose from "mongoose";

const customerSchema = { firstName: String, lastName: String, email: String };
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
