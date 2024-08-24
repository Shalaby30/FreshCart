import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./../../Context/CartContext";
import { AuthContext } from "../../Context/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";


export default function Cart() {
  const {
    getCart,
    cartDetails,
    setCartDetails,
    cartNum,
    removeFromCart,
    updateCount,
  } = useContext(CartContext);
  const { access } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCartItem() {
    try {
      const res = await getCart();
      if (res.status === "success") {
        setCartItems(res.data.products);
        setCartDetails(res.data);
        console.log(cartDetails);
      } else {
        toast.error("Failed to load cart items.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching the cart.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id) {
    const res = await removeFromCart(id);
    if (res.status === "success") {
      getCartItem();
      toast.success("Product removed successfully", {
        position: "top-right",
        autoClose: 1500,
        delay: 1500,
      });
    } else {
      toast.error(res.message || "Something went wrong");
    }
  }

  async function updateProductCount(id, count) {
    const res = await updateCount(id, count);
    if (res.status === "success") {
      getCartItem();
      toast.success("Product count updated successfully", {
        position: "top-right",
        autoClose: 1500,
        delay: 1500,
      });
    } else {
      toast.error(res.message || "Something went wrong");
    }
  }

  useEffect(() => {
    if (access) {
      getCartItem();
    }
  }, [access]);

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {cartItems.length > 0 ? (
              <div className="bg-white overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className="">
                      <th className="py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase  ">
                        Products
                      </th>
                      <th className=" py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase   ">
                        Quantity
                      </th>
                      <th className=" py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase   ">
                        Price
                      </th>
                      <th className=" py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase   ">
                        Total
                      </th>
                      <th className=" py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase px-6   ">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td className="py-4 whitespace-no-wrap text-sm leading-5">
                          <div className="flex items-center">
                            <div className="flex ">
                              <img
                                className="h-28 w-28 object-cover"
                                src={item.product.imageCover}
                                alt={item.product.title}
                              />
                              <div className="ml-4  flex flex-col justify-between">
                                <div className="text-lg font-bold text-gray-900 mb-2">
                                  {item.product.title}
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Brand:{" "}
                                    <span className="text-black font-semibold">
                                      {item.product.brand.name}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Category:{" "}
                                    <span className="text-black font-semibold">
                                      {item.product.category.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className=" py-4 whitespace-no-wrap text-sm leading-5">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updateProductCount(
                                  item.product._id,
                                  item.count - 1
                                )
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span className="mx-3 font-semibold">
                              {item.count}
                            </span>
                            <button
                              onClick={() =>
                                updateProductCount(
                                  item.product._id,
                                  item.count + 1
                                )
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </td>

                        <td className=" py-4 whitespace-no-wrap text-sm leading-5 font-semibold text-gray-900">
                          {item.price} EGP
                        </td>
                        <td className=" py-4 whitespace-no-wrap text-sm leading-5 font-semibold text-gray-900">
                          {item.price * item.count} EGP
                        </td>
                        <td className="">
                          <button
                            onClick={() => deleteProduct(item.product._id)}
                            className="text-red-600 ms-10 hover:text-red-500"
                          >
                            <i className="fas font- fa-trash-can text-2xl text-center"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center mt-6">Your cart is empty.</div>
            )}

            {cartDetails && (
              <div className="mt-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Total Items: {cartNum}
                </h2>
                <h2 className="text-xl font-semibold">
                  Total Price: {cartDetails.totalCartPrice} EGP
                </h2>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Link to="/" className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2  rounded">
                ← Back to Shopping
              </Link>
              <Link to={"/checkout"} className="bg-blue-600 px-4 hover:bg-blue-700 text-white py-2  rounded">
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Cart</title>
      </Helmet>
    </section>
  );
}