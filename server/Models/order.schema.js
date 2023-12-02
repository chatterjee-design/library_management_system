
import { model, Schema } from "mongoose";

const orderItemSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "library",
    required:[true, "Book is required"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: [true, "UserId is required"],
  },
  items: [orderItemSchema], // An array of items using the orderItemSchema 
  orderDate: {
    type: Date,
    default: Date.now,
  },
},
{
    timestamps : true
});

const Order = model("Order", orderSchema);

export default Order;
