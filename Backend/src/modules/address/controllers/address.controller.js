import {
  addAddressService,
  getAddressesService,
  updateAddressService,
  deleteAddressService,
} from "../services/address.service.js";

export const addAddress = async (
  req,
  res
) => {
  try {
    const address =
      await addAddressService(
        req.user._id,
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Address added successfully",
      data: address,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAddresses =
  async (req, res) => {
    try {
      const addresses =
        await getAddressesService(
          req.user._id
        );

      res.status(200).json({
        success: true,
        count: addresses.length,
        data: addresses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateAddress =
  async (req, res) => {
    try {
      const address =
        await updateAddressService(
          req.user._id,
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Address updated successfully",
        data: address,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const deleteAddress =
  async (req, res) => {
    try {
      await deleteAddressService(
        req.user._id,
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Address deleted successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };