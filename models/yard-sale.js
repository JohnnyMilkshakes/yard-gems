import mongoose from "mongoose";
const Schema = mongoose.Schema;

const yardSaleSchema = new Schema({
    yardOwner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    physicalDisplayDates: [{ type: String }],
    itemsForSale: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
  });

const YardSale = mongoose.model("YardSale", yardSaleSchema);

export default YardSale;