import Maintenance from "../models/maintenance.model.js";

export const createMaintenanceService =
  async (data, userId) => {
    const maintenance =
      await Maintenance.create({
        ...data,
        user: userId,
      });

    return maintenance;
  };

export const getMyMaintenanceService =
  async (userId) => {
    return await Maintenance.find({
      user: userId,
    })
      .populate("rental")
      .sort({
        createdAt: -1,
      });
  };

export const getAllMaintenanceService =
  async () => {
    return await Maintenance.find()
      .populate("user", "name email")
      .populate("rental")
      .sort({
        createdAt: -1,
      });
  };

export const updateMaintenanceStatusService =
  async (id, updateData) => {
    return await Maintenance.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
  };