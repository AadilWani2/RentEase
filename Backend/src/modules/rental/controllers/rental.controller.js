import {
  createRentalService,
  getMyRentalsService,
  returnRentalService,
  extendRentalService,
} from "../services/rental.service.js";

export const createRental = async (
  req,
  res
) => {
  try {
    const rental =
      await createRentalService(
        req.body,
        req.user._id
      );

    res.status(201).json({
      success: true,
      message:
        "Product rented successfully",
      data: rental,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyRentals = async (
  req,
  res
) => {
  try {
    const rentals =
      await getMyRentalsService(
        req.user._id
      );

    res.status(200).json({
      success: true,
      count: rentals.length,
      data: rentals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const returnRental = async (
  req,
  res
) => {
  try {
    const rental =
      await returnRentalService(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message:
        "Rental returned successfully",
      data: rental,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const extendRental = async (
  req,
  res
) => {
  try {
    const rental =
      await extendRentalService(
        req.params.id,
        req.body.extraMonths
      );

    res.status(200).json({
      success: true,
      message:
        "Rental extended successfully",
      data: rental,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};