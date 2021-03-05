import mongoose from "mongoose";

const liquorSchema = {
  name: String,
  price: Number,
  alc: Number,
  color: String,
};
const Liquor = mongoose.model("Liquor", liquorSchema);

export default Liquor;
