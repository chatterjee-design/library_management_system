import Cart from "../Models/cart.schema.js";
import Library from "../Models/library.schema.js";
import Order from "../Models/order.schema.js";
import AppError from "../Utills/appError.js";

// Place an order
const placeOrder = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!bookId) {
      return next(new AppError("Every fields are required", 400));
    }

    // Check if the book exists
    const book = await Library.findById(bookId);
    if (!book) {
      return next(new AppError("Book not found", 404));
    }

    let order = await Order.findOne({ userId });
    if (!order) {
      order = await Order.create({ userId, items: [] });
    }

    order.items.push({ bookId, quantity });

    await order.save()

    res.status(200).json({
        success: true,
        message: "Order placed successfully",
        data: order,
      });
  
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const getOrderDetails = async (req, res,next) => {
    try {
        const userId = req.user.id;

        const order = await Order.findOne({ userId }).populate({
          path: 'items.bookId',
          model: 'library',
        });
    
        res.status(200).json({
          success: true,
          data: order,
        });
    } catch (error) {
        return next(new AppError("Internal Server Error", 500));
    }
}
export { placeOrder, getOrderDetails };
