import {
  getDashboardAnalyticsService,
} from "../services/analytics.service.js";

export const getDashboardAnalytics =
  async (req, res) => {
    try {
      const analytics =
        await getDashboardAnalyticsService();

      res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };