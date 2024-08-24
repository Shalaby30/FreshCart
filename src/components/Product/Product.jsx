import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from './../../Context/WishlistContext';
import { CartContext } from './../../Context/CartContext';

export default function Product({ product }) {
  const { wishlistDetails, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addtoCart } = useContext(CartContext);


  useEffect(() => {
    setIsInWishlist(wishlistDetails.some(item => item._id === product._id));
  }, [wishlistDetails, product._id]);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <div className="product p-2 border rounded">
      <div>
        <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
          <img
            src={product.imageCover}
            className="w-full rounded-md mb-3"
            alt={product.title}
          />
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-between">
          <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
            <h3 className="text-lg font-semibold line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <span className="text-lg font-semibold text-green-500">
            {product.price} EGP
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleWishlistToggle} 
            className={`icon ${isInWishlist ? 'text-green-500' : ''}`}
          >
            <i className="fas fa-heart"></i>
          </button>
            <button onClick={() => addtoCart(product.id)} className="icon">
              <i className="fas fa-cart-shopping"></i>
            </button>
        </div>
      </div>
    </div>
  );
}
