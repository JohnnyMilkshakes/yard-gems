import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    yardSale: { type: Schema.Types.ObjectId, ref: 'YardSale' },
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
  });

const User = mongoose.model("User", userSchema);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
    }
});

export default User 