import {
  createMaintenanceService,
  getMyMaintenanceService,
  getAllMaintenanceService,
  updateMaintenanceStatusService,
} from "../services/maintenance.service.js";

export const createMaintenance =
  async (req, res) => {
    try {
      const maintenance =
        await createMaintenanceService(
          req.body,
          req.user._id
        );

      res.status(201).json({
        success: true,
        message:
          "Maintenance request created",
        data: maintenance,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getMyMaintenance =
  async (req, res) => {
    try {
      const maintenance =
        await getMyMaintenanceService(
          req.user._id
        );

      res.status(200).json({
        success: true,
        count: maintenance.length,
        data: maintenance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getAllMaintenance =
  async (req, res) => {
    try {
      const maintenance =
        await getAllMaintenanceService();

      res.status(200).json({
        success: true,
        count: maintenance.length,
        data: maintenance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateMaintenanceStatus =
  async (req, res) => {
    try {
      const maintenance =
        await updateMaintenanceStatusService(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Maintenance updated successfully",
        data: maintenance,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };