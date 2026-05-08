import React from "react";

import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { Toaster } from "react-hot-toast";

import {
  AuthProvider,
} from "./features/auth/AuthContext";

import {
  WishlistProvider,
} from "./features/wishlist/WishlistContext";

import {
  NotificationProvider,
} from "./features/notifications/NotificationContext";

import {
  CartProvider,
} from "./features/cart/CartContext";

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(
  <React.StrictMode>
    
    <AuthProvider>
      
      <CartProvider>
        <NotificationProvider>
          
          <WishlistProvider>
            
            <App />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,

              style: {
                background:
                  "#ffffff",

                color:
                  "#111827",

                borderRadius:
                  "12px",

                padding:
                  "16px",

                fontSize:
                  "14px",

                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.1)",
              },

              success: {
                style: {
                  border:
                    "1px solid #22c55e",
                },
              },

              error: {
                style: {
                  border:
                    "1px solid #ef4444",
                },
              },
            }}
          />
        </WishlistProvider>
      </NotificationProvider>
    </CartProvider>
  </AuthProvider>
</React.StrictMode>
);