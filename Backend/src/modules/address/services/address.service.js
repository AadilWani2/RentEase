import Address from "../models/address.model.js";

export const addAddressService =
  async (userId, data) => {
    if (data.isDefault) {
      await Address.updateMany(
        { user: userId },
        { isDefault: false }
      );
    }

    const address =
      await Address.create({
        ...data,
        user: userId,
      });

    return address;
  };

export const getAddressesService =
  async (userId) => {
    return await Address.find({
      user: userId,
    }).sort({
      isDefault: -1,
      createdAt: -1,
    });
  };

export const updateAddressService =
  async (userId, addressId, data) => {
    const address =
      await Address.findOne({
        _id: addressId,
        user: userId,
      });

    if (!address) {
      throw new Error(
        "Address not found"
      );
    }

    if (data.isDefault) {
      await Address.updateMany(
        { user: userId },
        { isDefault: false }
      );
    }

    Object.assign(address, data);

    await address.save();

    return address;
  };

export const deleteAddressService =
  async (userId, addressId) => {
    const address =
      await Address.findOneAndDelete({
        _id: addressId,
        user: userId,
      });

    if (!address) {
      throw new Error(
        "Address not found"
      );
    }

    return address;
  };