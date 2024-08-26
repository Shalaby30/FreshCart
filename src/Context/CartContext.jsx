import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { access } = useContext(AuthContext);
  const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;
  const [cartNum, setCartNum] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [CartId, setCartId] = useState(null);
  const [userId, setuserId] = useState(null);

  const headers = {
    token: access,
  };

  async function addtoCart(productId) {
    if (!access) {
      toast.error("Please log in to add items to the cart");
      return;
    }
    try {
      const { data } = await axios.post(endpoint, { productId }, { headers });
      setCartNum(data.numOfCartItems);
      setCartDetails(data.data);
      console.log(cartDetails);
      setuserId(data.data.cartOwner);

      if (data.status === "success") {
        setCartId(data.data._id);

        toast.success(data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
        });
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }

  async function getCart() {
    try {
      const { data } = await axios.get(endpoint, { headers });
      setCartNum(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setuserId(data.data.cartOwner);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromCart(productId) {
    try {
      const { data } = await axios.delete(`${endpoint}/${productId}`, {
        headers,
      });
      setCartNum(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setuserId(data.data.cartOwner);
      return data;
    } catch (error) {
      console.log("Error removing item:", error);
      const errorMessage = error.response?.data?.message;
      return { status: "error", message: errorMessage };
    }
  }

  async function ClearCart() {
    try {
      const { data } = await axios.delete(`${endpoint}`, { headers });
      setCartNum(data.numOfCartItems);
      setCartDetails([]);
      setCartId(data.data._id);
      // setuserId(data.data.cartOwner);
      console.log(cartDetails);
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error removing item:", error);
      const errorMessage = error.response?.data?.message;
      return { status: "error", message: errorMessage };
    }
  }

  async function updateCount(productId, count) {
    try {
      const { data } = await axios.put(
        `${endpoint}/${productId}`,
        { count },
        { headers }
      );
      setCartNum(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setuserId(data.data.cartOwner);
      return data;
    } catch (error) {
      console.log("Error removing item:", error);
      const errorMessage = error.response?.data?.message;
      return { status: "error", message: errorMessage };
    }
  }

  async function getPayment(url, shippingAddress) {
    try {
      const { data } = await axios.post(url, { shippingAddress }, { headers });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  useEffect(() => {
    if (access) {
      getCart();
    }
  }, [access]);

  return (
    <CartContext.Provider
      value={{
        addtoCart,
        getCart,
        cartNum,
        cartDetails,
        ClearCart,
        setCartDetails,
        cartNum,
        removeFromCart,
        updateCount,
        getPayment,
        CartId,
        userId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
