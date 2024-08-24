import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./Auth";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const { access } = useContext(AuthContext);
  const endpoint = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const [wishNum, setWishNum] = useState(0);
  const [wishlistDetails, setWishlistDetails] = useState([]);

  const headers = {
    token: access,
  };

  async function addToWishlist(productId) {
    try {
      const { data } = await axios.post(endpoint, { productId }, { headers });
      setWishlistDetails(data.data);
      setWishNum(data.count);
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
      setWishlistDetails(data.data);
      setWishNum(data.count);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const { data } = await axios.delete(`${endpoint}/${productId}`, {
        headers,
      });
      setWishlistDetails(data.data);
      setWishNum(data.count);
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
