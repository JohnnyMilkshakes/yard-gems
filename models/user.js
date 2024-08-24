import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId },
    garageSale: {type: Schema.Types.ObjectId},
    seller: {type: Boolean},
    paymentDetails: {type: Schema.Types.ObjectId},
  });

const User = mongoose.model("User", userSchema);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
    }
});

export default User 