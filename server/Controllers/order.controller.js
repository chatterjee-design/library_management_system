import Cart from "../Models/cart.schema.js";
import Order from "../Models/order.schema.js";
import AppError from "../Utills/appError.js";

// Place an order
const placeOrder = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const cart = await Cart.findOne({ userId }).populate({
          path: 'items.bookId',
          model: 'library',
        });

    
        // Check if the cart is empty
        if (!cart || cart.items.length === 0) {
          return next(new AppError("Cart is empty", 400));
        }
    
        // Create an order
        const order = await Order.create({
          userId,
          items: cart.items.map((item) => ({
            bookId: item.bookId, // Ensure that this corresponds to the correct field in your Cart model
            quantity: item.quantity,
          })),
        });
    
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
    // Retrieve all orders from the database
    const orders = await Order.find({}).populate({
      path: 'items.bookId',
      model: 'library',
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

export { placeOrder, getAllOrders };
