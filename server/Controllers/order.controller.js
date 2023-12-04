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
        path: 'items.bookId',
        model: 'library',
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
    const userId = req.user.id;

    // Retrieve all orders from the database
    const orders = await Order.find({userId})

    if (!orders || orders.length === 0) {
      return next(new AppError("order length is 0", 400));
    }

    await Order.populate(orders, {
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

//get one order details
const getOneOrder = async (req, res, next) => {
  try {
    const id = req.params._id;

    // Retrieve the order from the database by its id
    const order = await Order.findById(id).populate({
      path: 'items.bookId',
      model: 'library',
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
    console.log(error.message);
    return next(new AppError("Internal Server Error", 500));
  }
};

export { placeOrder, getAllOrders, getOneOrder };
