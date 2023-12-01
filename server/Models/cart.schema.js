import { model, Schema } from "mongoose";

const cartItemSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "library",
    required: [true, "BookId is required"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },
  items: [cartItemSchema], // An array of items using the cartItemSchema 
},
{
    timestamps : true
});

const Cart = model("Cart", cartSchema);

export default Cart;
