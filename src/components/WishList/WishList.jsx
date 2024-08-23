import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { AuthContext } from "../../Context/Auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Wishlist() {
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
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        {wishlistItems.length > 0 ? (
          <div className="bg-white overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase">
                    Products
                  </th>
                  <th className="py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase">
                    Price
                  </th>
                  <th className="py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase px-6">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-4 whitespace-no-wrap text-sm leading-5">
                      <div className="flex items-center">
                        <img
                          className="h-28 w-28 object-cover"
                          src={item.imageCover}
                          alt={item.title}
                        />
                        <div className="ml-4 flex flex-col justify-between">
                          <div className="text-lg font-bold text-gray-900 mb-2">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            Brand:{" "}
                            <span className="text-black font-semibold">
                              {item.brand.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Category:{" "}
                            <span className="text-black font-semibold">
                              {item.category.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 whitespace-no-wrap text-sm leading-5 font-semibold text-gray-900">
                      {item.price} EGP
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-6">Your wishlist is empty.</div>
        )}
        <div className="flex justify-between mt-8">
          <Link
            to="/"
            className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded"
          >
            ← Back to Shopping
          </Link>
          <Link
            to="/checkout"
            className="bg-blue-600 px-4 hover:bg-blue-700 text-white py-2 rounded"
          >
            Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
