import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWishlist,
  toggleWishlist,
  removeFromWishlist,
} from "./wishlistService";

import {
  useAuth,
} from "../auth/AuthContext";

const WishlistContext =
  createContext();

export const WishlistProvider =
  ({ children }) => {
    const { user } =
      useAuth();

    const [wishlist,
      setWishlist] =
      useState([]);

    useEffect(() => {
      if (user) {
        fetchWishlist();
      } else {
        setWishlist([]);
      }
    }, [user]);

    const fetchWishlist =
      async () => {
        try {
          const data =
            await getWishlist();

          setWishlist(data);
        } catch (error) {
          console.log(error);
        }
      };

    const toggleFavorite =
      async (productId) => {
        if (!user) return;
        
        try {
          if (isInWishlist(productId)) {
            await removeFromWishlist(productId);
          } else {
            await toggleWishlist(productId);
          }

          fetchWishlist();
        } catch (error) {
          console.log("Wishlist Error:", error.response?.data?.message || error.message);
        }
      };

    const isInWishlist =
      (productId) => {
        return wishlist.some(
          (item) =>
            item.product?._id === productId || item.product === productId
        );
      };

    return (
      <WishlistContext.Provider
        value={{
          wishlist,
          toggleFavorite,
          isInWishlist,
        }}
      >
        {children}
      </WishlistContext.Provider>
    );
  };

export const useWishlist =
  () =>
    useContext(
      WishlistContext
    );