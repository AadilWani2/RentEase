import User from "../../auth/models/user.model.js";
import Product from "../../products/models/product.model.js";
import Rental from "../../rental/models/rental.model.js";
import Order from "../../orders/models/order.model.js";
import Maintenance from "../../maintenance/models/maintenance.model.js";

export const getDashboardAnalyticsService =
  async () => {
    const totalUsers =
      await User.countDocuments();

    const totalAdmins =
      await User.countDocuments({
        role: "admin",
      });

    const totalVendors =
      await User.countDocuments({
        role: "vendor",
      });

    const totalProducts =
      await Product.countDocuments();

    const availableProducts =
      await Product.countDocuments({
        availableQuantity: { $gt: 0 },
      });

    const outOfStockProducts =
      await Product.countDocuments({
        availableQuantity: 0,
      });

    const totalRentals =
      await Rental.countDocuments();

    const activeRentals =
      await Rental.countDocuments({
        status: "active",
      });

    const returnedRentals =
      await Rental.countDocuments({
        status: "returned",
      });

    const totalOrders =
      await Order.countDocuments();

    const pendingOrders =
      await Order.countDocuments({
        orderStatus: "pending",
      });

    const completedOrders =
      await Order.countDocuments({
        orderStatus: "completed",
      });

    const pendingMaintenance =
      await Maintenance.countDocuments({
        status: "pending",
      });

    const resolvedMaintenance =
      await Maintenance.countDocuments({
        status: "resolved",
      });

    const revenueData =
      await Order.aggregate([
        {
          $match: {
            paymentStatus: "paid",
          },
        },

        {
          $group: {
            _id: null,

            totalRevenue: {
              $sum: "$totalAmount",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    const monthlyRevenue =
      await Order.aggregate([
        {
          $match: {
            paymentStatus: "paid",
          },
        },

        {
          $group: {
            _id: {
              month: {
                $month: "$createdAt",
              },

              year: {
                $year: "$createdAt",
              },
            },

            revenue: {
              $sum: "$totalAmount",
            },
          },
        },

        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

    return {
      users: {
        totalUsers,
        totalAdmins,
        totalVendors,
      },

      products: {
        totalProducts,
        availableProducts,
        outOfStockProducts,
      },

      rentals: {
        totalRentals,
        activeRentals,
        returnedRentals,
      },

      orders: {
        totalOrders,
        pendingOrders,
        completedOrders,
      },

      maintenance: {
        pendingMaintenance,
        resolvedMaintenance,
      },

      revenue: {
        totalRevenue,
        monthlyRevenue,
      },
    };
};