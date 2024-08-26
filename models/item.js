import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemOwner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
