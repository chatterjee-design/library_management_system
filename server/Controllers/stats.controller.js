import Cart from "../Models/cart.schema.js";
import Library from "../Models/library.schema.js";
import Order from "../Models/order.schema.js";
import User from "../Models/user.schema.js";
import AppError from "../Utills/appError.js";

const statCount = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    // const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: "ADMIN" });
    const totalBooks = await Library.countDocuments()
    const totalOrders = await Order.countDocuments()
    const totalReturns = await Order.countDocuments({ returned : true });
    const totalCartItems = await Cart.countDocuments()
    const ordersByMonth = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$orderDate" },
            month: { $month: "$orderDate" },
            year: { $year: "$orderDate" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          day: "$_id.day",
          month: "$_id.month",
          year: "$_id.year",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          year: 1,
          month: 1,
          day: 1,
        },
      },
    ]);
    
    res.status(200).json({
      totalUsers,
      adminUsers,
      totalBooks,
      totalOrders,
      totalReturns,
      totalCartItems,
      ordersByMonth
    });
  } catch (error) {
    console.log(error.message);
    return next(new AppError("Internal server error", 500));
  }
};

export { statCount };
