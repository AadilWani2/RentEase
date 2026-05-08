import mongoose from "mongoose";

const maintenanceSchema =
  new mongoose.Schema(
    {
      rental: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rental",
        required: true,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      issueType: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      images: [
        {
          type: String,
        },
      ],

      status: {
        type: String,
        enum: [
          "pending",
          "in-progress",
          "resolved",
          "rejected",
        ],
        default: "pending",
      },

      resolutionNotes: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

const Maintenance = mongoose.model(
  "Maintenance",
  maintenanceSchema
);

export default Maintenance;