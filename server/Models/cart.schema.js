import { model, Schema } from "mongoose";

const cartItemSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Library",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
});

const Cart = model("Cart", cartSchema);

export default Cart;
