import orderModel from "../models/order.model.js";

// Create order
const createOrder = async (req, res) => {
  try {
    let { userId, amount, address } = req.body;

    if (!userId || !amount || !address) {
      return res.status(500).json("All fields are required");
    }

    const newOrder = await orderModel.create({
      userId,
      amount,
      address,
      products,
      status,
    });
    if (!newOrder) {
      return res.status(500).json("Something went wrong");
    }

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Update the order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );

    return res.status(201).json(updatedCart);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Delete the order
const deleteOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Order deleted successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get the order
const getOrder = async (req, res) => {
  try {
    const orders = await orderModel.findOne({ userId: req.params.userId });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get all the orders
const getAllOrders = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    // check if there's any query with-in the header
    // if there's query then take action based on the query
    // otherwise show all the data

    let orders;
    if (queryNew) {
      orders = await orderModel.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      orders = await orderModel.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      orders = await orderModel.find();
    }

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const incomeStats = async (eq, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));


  try {
    const income = await orderModel.aggregate([
      { $match: { createdAt: { $gte: prevMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount" 
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    return res.status(200).json(income);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  incomeStats,
};
