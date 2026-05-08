import express from "express";
import cors from "cors";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import xss from "xss-clean";
// import hpp from "hpp";

// Routes
import authRoutes from "./modules/auth/routes/auth.routes.js";
import productRoutes from "./modules/products/routes/product.routes.js";
import cartRoutes from "./modules/cart/routes/cart.routes.js";
import orderRoutes from "./modules/orders/routes/order.routes.js";
import addressRoutes from "./modules/address/routes/address.routes.js";
import paymentRoutes from "./modules/payment/routes/payment.routes.js";
import wishlistRoutes from "./modules/wishlist/routes/wishlist.routes.js";
import reviewRoutes from "./modules/reviews/routes/review.routes.js";
import notificationRoutes from "./modules/notifications/routes/notification.routes.js";
import maintenanceRoutes from "./modules/maintenance/routes/maintenance.routes.js";
import mongoSanitize from "@exortek/express-mongo-sanitize";

// Error Middleware
import errorMiddleware from "./middleware/error.middleware.js";


const app = express();

// ============================================
// GLOBAL MIDDLEWARE
// ============================================

app.use(
  cors({
    origin: "https://rent-ease-x4l1.vercel.app/",
    credentials: true,
  })
);

// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// ============================================
// HEALTH CHECK
// ============================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RentEase API Running Successfully",
  });
});

// ============================================
// API ROUTES
// ============================================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/maintenance", maintenanceRoutes);

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ============================================
// GLOBAL ERROR HANDLER
// ============================================

app.use(errorMiddleware);

export default app;