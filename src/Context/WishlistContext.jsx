import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const { access } = useContext(AuthContext);
  const endpoint = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const [wishNum, setWishNum] = useState(0);
  const [wishlistDetails, setWishlistDetails] = useState(null);

  const headers = {
    token: access,
  };

  async function addToWishlist(productId) {
    try {
      const { data } = await axios.post(endpoint, { productId }, { headers });
      setWishNum(data.count);
      setWishlistDetails(data.data);

      toast.success("Item added to wishlist!");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to add item to wishlist"
      );
    }
  }

  async function getWishlist() {
    try {
      const { data } = await axios.get(endpoint, { headers });
      setWishNum(data.count);
      setWishlistDetails(data.data);

      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch wishlist");
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const { data } = await axios.delete(`${endpoint}/${productId}`, {
        headers,
      });
      setWishNum(data.count);
      setWishlistDetails(data.data);
      toast.success("Item removed from wishlist");
      return data;
    } catch (error) {
      console.log("Error removing item:", error);
      toast.error(
        error.response?.data?.message || "Failed to remove item from wishlist"
      );
    }
  }

  useEffect(() => {
    if (access) {
      getWishlist();
    }
  }, [access]);

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        getWishlist,
        wishNum,
        wishlistDetails,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
