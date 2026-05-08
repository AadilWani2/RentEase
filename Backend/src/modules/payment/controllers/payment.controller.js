import {
  createRazorpayOrderService,
  verifyPaymentService,
} from "../services/payment.service.js";

export const createRazorpayOrder =
  async (req, res) => {
    try {
      const razorpayOrder =
        await createRazorpayOrderService(
          req.params.orderId
        );

      res.status(200).json({
        success: true,
        data: razorpayOrder,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const verifyPayment =
  async (req, res) => {
    try {
      const order =
        await verifyPaymentService(
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Payment verified successfully",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };