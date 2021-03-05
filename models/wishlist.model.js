import mongoose from "mongoose";

const wishlistSchema = {
  customerId: String,
  productName: String,
  productPrice: Number,
};
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
