import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { AuthContext } from "../../Context/Auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CartContext } from "./../../Context/CartContext";
import {Helmet} from "react-helmet";


export default function Wishlist() {
  const { addtoCart } = useContext(CartContext);
  const { getWishlist, removeFromWishlist, wishlistDetails } =
    useContext(WishlistContext);
  const { access } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchWishlistItems() {
    try {
      const res = await getWishlist();
      if (res.status === "success") {
        setWishlistItems(res.data);
      } else {
        toast.error("Failed to load wishlist items.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching wishlist.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveItem(productId) {
    const res = await removeFromWishlist(productId);
    if (res.status === "success") {
      fetchWishlistItems();
    } else {
      toast.error(res.message || "Failed to remove item.");
    }
  }

  useEffect(() => {
    if (access) {
      fetchWishlistItems();
    }
  }, [access]);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 p-4 flex flex-col justify-between"
              >
                <img
                  className="h-250 w-full object-cover mb-4"
                  src={item.imageCover}
                  alt={item.title}
                />
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500">{item.category.name}</p>
                  </div>
                  <div className="mt-4">
                    <span className="text-xl font-bold text-gray-900">
                      ${item.price}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => addtoCart(item._id)}
                    className="bg-gray-900 text-white px-4 py-2 text-sm rounded hover:bg-gray-700"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="border border-gray-900 text-gray-900 px-4 py-2 text-sm rounded hover:bg-gray-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-6">Your wishlist is empty.</div>
        )}
      </div>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
    </section>
  );
}