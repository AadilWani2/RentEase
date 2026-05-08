const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.log("ERROR 💥:", err);
  
  err.statusCode =
    err.statusCode || 500;

  err.status =
    err.status || "error";

  // Duplicate MongoDB Key
  if (
    err.code === 11000
  ) {
    return res.status(400).json({
      success: false,

      message:
        "Duplicate field value entered",
    });
  }

  // Invalid JWT
  if (
    err.name ===
    "JsonWebTokenError"
  ) {
    return res.status(401).json({
      success: false,

      message:
        "Invalid token",
    });
  }

  // Expired JWT
  if (
    err.name ===
    "TokenExpiredError"
  ) {
    return res.status(401).json({
      success: false,

      message:
        "Token expired",
    });
  }

  // Mongoose Validation Errors
  if (
    err.name ===
    "ValidationError"
  ) {
    const errors =
      Object.values(
        err.errors
      ).map(
        (val) =>
          val.message
      );

    return res.status(400).json({
      success: false,

      message:
        errors.join(", "),
    });
  }

  res.status(
    err.statusCode
  ).json({
    success: false,

    message:
      err.message ||
      "Server Error",
  });
};

export default errorMiddleware;