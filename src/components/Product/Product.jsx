import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./../../Context/CartContext";
import { WishlistContext } from "./../../Context/WishlistContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function Product({ product }) {
  const { addtoCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

 

  return (
    <>
      <div className="product p-2">
        <div>
          <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
            <img
              src={product.imageCover}
              className="w-full rounded-md mb-3"
              alt={product.title}
            />
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
              <h3 className="text-lg font-semibold line-clamp-2">
                {product.title}
              </h3>
            </Link>
            <span className="text-lg font-semibold text-green-500">
              {product.price} EGP
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => addToWishlist(product.id)} className="icon">
              <i className="fas fa-heart"></i>
            </button>
            <button onClick={() => addtoCart(product.id)} className="icon">
              <i className="fas fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
