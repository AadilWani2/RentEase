import Product from "../models/product.model.js";

export const createProductService = async (
  productData,
  userId
) => {
  const product = await Product.create({
    ...productData,
    createdBy: userId,
  });

  return product;
};

export const getAllProductsService =
  async (queryParams) => {
    const {
      search,
      category,
      city,
      available,
      sort,
      page = 1,
      limit = 10,
    } = queryParams;

    const query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (city) {
      query.cityAvailability = city;
    }

    if (available === "true") {
      query.availableQuantity = {
        $gt: 0,
      };
    }

    let sortOption = {};

    if (sort === "lowToHigh") {
      sortOption.monthlyRent = 1;
    }

    if (sort === "highToLow") {
      sortOption.monthlyRent = -1;
    }

    const skip =
      (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .populate("createdBy", "name email")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const totalProducts =
      await Product.countDocuments(query);

    return {
      products,
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(
        totalProducts / Number(limit)
      ),
    };
  };

export const getSingleProductService =
  async (productId) => {
    return await Product.findById(
      productId
    ).populate("createdBy", "name email");
  };

export const updateProductService =
  async (productId, updateData) => {
    return await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
      }
    );
  };

export const deleteProductService =
  async (productId) => {
    return await Product.findByIdAndDelete(
      productId
    );
  };