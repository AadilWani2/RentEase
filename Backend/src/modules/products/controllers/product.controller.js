import {
  createProductService,
  getAllProductsService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
} from "../services/product.service.js";

export const createProduct = async (
    req,
    res
) => {
    try {
        const imageUrls = req.files.map(
            (file) => file.path
        );

        const product =
            await createProductService(
            {
                ...req.body,
                images: imageUrls,
            },
            req.user._id
        );

        res.status(201).json({
            success: true,
            message:
                "Product created successfully",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllProducts = async (
    req,
    res
    ) => {
        try {
            const result =
                await getAllProductsService(
                    req.query
                );

            res.status(200).json({
                success: true,
                totalProducts:
                    result.totalProducts,
                currentPage:
                    result.currentPage,
                totalPages:
                    result.totalPages,
                data: result.products,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

export const getSingleProduct = async (
  req,
  res
) => {
  try {
    const product =
      await getSingleProductService(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await updateProductService(
        req.params.id,
        req.body
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await deleteProductService(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};