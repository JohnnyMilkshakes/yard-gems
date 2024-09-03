import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  cartOwner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  itemsInCart: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  totalCost: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;