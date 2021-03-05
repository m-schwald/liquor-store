import mongoose from "mongoose";

const shoppingCartSchema = {
  customerId: String,
  productName: String,
  productPrice: Number,
};
const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

export default ShoppingCart;
