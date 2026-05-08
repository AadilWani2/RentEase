import {
  createOrderService,
  getMyOrdersService,
  getAllOrdersService,
  updateOrderStatusService,
} from "../services/order.service.js";

export const createOrder = async (
  req,
  res
) => {
  try {
    const order =
      await createOrderService(
        req.body,
        req.user._id
      );

    res.status(201).json({
      success: true,
      message:
        "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await getMyOrdersService(
        req.user._id
      );

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await getAllOrdersService();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus =
  async (req, res) => {
    try {
      const order =
        await updateOrderStatusService(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Order updated successfully",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };