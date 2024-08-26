import mongoose from "mongoose";
const Schema = mongoose.Schema;

const yardSaleSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    physicalDisplayDates: [{ type: String, required: true }],
    itemsForSale: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
  });

const YardSale = mongoose.model("YardSale", yardSaleSchema);

export default YardSale;