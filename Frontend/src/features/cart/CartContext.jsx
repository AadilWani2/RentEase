import { createContext, useContext, useState, useEffect } from "react";
import * as cartService from "./cartService";
import { useAuth } from "../auth/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity, tenureMonths) => {
    try {
      const updatedCart = await cartService.addToCart(productId, quantity, tenureMonths);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await cartService.removeCartItem(productId);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity, tenureMonths) => {
    try {
      const updatedCart = await cartService.updateCartItem(productId, quantity, tenureMonths);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, updateQuantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
