import Cart from "../Models/cart.schema.js";
import Library from "../Models/library.schema.js";
import AppError from "../Utills/appError.js";

// Add a book to the user's cart
const addToCart = async (req, res, next) => {
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

    // Create or update the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Check if the book is already in the cart
    const existingItemIndex = cart.items.findIndex((item) =>
      item.bookId.equals(book._id)
    );
    if (existingItemIndex === -1) {
      cart.items.push({ bookId, quantity });
    }

    // Fetch the updated book details to include in the response
    const updatedBook = await Library.findById(bookId);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Book added to cart successfully",
      data: { cart, book: updatedBook },
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Get user's cart
const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.bookId',
      model: 'library',
    });

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

//remove book from cart
const removeFromCart = async (req, res, next) => {
  try {
      const { bookId } = req.body; 
      const userId = req.user.id;
  
      // Validate input
      if (!bookId) {
        return next(new AppError("Every field is required", 400));
      }
  
      // Find the user's cart
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return next(new AppError("Cart Not Found", 400));
      }

      // Find the index of the item to remove in the items array
    const itemIndex = cart.items.findIndex(book => book.bookId.toString() === bookId);

    // Check if the item exists in the cart
    if (itemIndex === -1) {
      return next(new AppError("Item not found in the cart", 400));
    }

    // Remove the item from the items array
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from the cart successfully",
      data: cart,
    });

  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
}

export { addToCart, getCart, removeFromCart };
