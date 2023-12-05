import Cart from "../Models/cart.schema.js";
import Library from "../Models/library.schema.js";
import Order from "../Models/order.schema.js";
import AppError from "../Utills/appError.js";

// Place an order
const placeOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.bookId",
      model: "library",
    });

    // Check if the cart is empty
    if (!cart || cart.items.length === 0) {
      return next(new AppError("Cart is empty", 400));
    }

    // Create an order with populated bookId
    const order = await Order.create({
      userId,
      items: cart.items.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
      })),
    });

    // Populate bookId in the newly created order
    await Order.populate(order, {
      path: "items.bookId",
      model: "library",
    });

    // Update the quantity of books in the library
    for (const item of cart.items) {
      await Library.findByIdAndUpdate(item.bookId._id, {
        $inc: { numberOfBooks: -item.quantity },
      });
    }

    // Clear the user's cart
    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

//get all the orders
const getAllOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Retrieve all orders from the database
    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
      return next(new AppError("order length is 0", 400));
    }

    await Order.populate(orders, {
      path: "items.bookId",
      model: "library",
    });

    res.status(200).json({
      success: true,
      message: "Order gets successfully",
      data: orders,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

//get one order details
const getOneOrder = async (req, res, next) => {
  try {
    const id = req.params._id;

    // Retrieve the order from the database by its id
    const order = await Order.findById(id).populate({
      path: "items.bookId",
      model: "library",
    });

    if (!order) {
      return next(new AppError("failed to fetch the book details", 404));
    }

    res.status(200).json({
      success: true,
      message: "Order gets successfully",
      data: order,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Return a book
const returnBook = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const { id } = req.user;

    if (!_id || !id) {
      return next(new AppError("Something is missing", 404));
    }

    const order = await Order.findOne({ _id, userId: id }).populate({
      path: "items.bookId",
      model: "library",
    });

    // Check if the order exists
    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    if (order.returned === true) {
      return next(new AppError("Order already returned", 400));
    }

    // Update the quantity of books in the library
    for (const item of order.items) {
      await Library.findByIdAndUpdate(item.bookId._id, {
        $inc: { numberOfBooks: item.quantity },
      });
    }

    // Mark the order as returned
    order.returned = true;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Books returned successfully",
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

export { placeOrder, getAllOrders, getOneOrder, returnBook };
