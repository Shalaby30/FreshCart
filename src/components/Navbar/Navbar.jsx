import React, { useContext } from "react";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import { CartContext } from './../../Context/CartContext';

import { WishlistContext } from "./../../Context/WishlistContext";
export default function Navbar() {
  const { access, setAccess } = useContext(AuthContext);
  const { wishNum } = useContext(WishlistContext);
  function handleLogout() {
    localStorage.removeItem("Token");
    setAccess(null);
  }
  const { cartNum } = useContext(CartContext);

  
  return (
    <nav className="bg-gray-100 z-50 p-4 fixed top-0 left-0 right-0">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left */}
          <div className="flex items-center flex-col lg:flex-row">
            <img src={logo} alt="Fresh Cart" className="h-10" />
            {access && (
              <ul className="flex flex-col lg:flex-row items-center mt-2 lg:mt-0">
                <li><NavLink to="/" className="mx-1 p-1">Home</NavLink></li>
                <li><NavLink to="/products" className="mx-1 p-1">Products</NavLink></li>
                <li><NavLink to="/categories" className="mx-1 p-1">Categories</NavLink></li>
                <li><NavLink to="/brands" className="mx-1 p-1">Brands</NavLink></li>
                
                <li><NavLink to="/cart" className="mx-1 p-1">
                  <button type="button" className="relative inline-flex items-center p-3 text-sm">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cartNum}</div>
                  </button>
                </NavLink></li>
                <li><NavLink to="/wishlist" className="mx-1 p-1">
                  <button type="button" className="relative inline-flex items-center p-3 text-sm">
                    <i className="fas fas fa-heart"></i>
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{wishNum}</div>
                  </button>
                </NavLink></li>
              </ul>
            )}
          </div>
          {/* Right */}
          <div>
            <ul className="flex flex-col lg:flex-row items-center mt-2 lg:mt-0">
              {access ? (
                <>
                  <li><Link className="mx-1 p-1" onClick={handleLogout}>Logout</Link></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/login" className="mx-1 p-1">Sign in</NavLink></li>
                  <li><NavLink to="/register" className="mx-1 p-1">Sign up</NavLink></li>
                </>
              )}
              <li className="flex space-x-2">
                <a href="https://facebook.com" aria-label="Facebook" className="fab fa-facebook mx-2"></a>
                <a href="https://twitter.com" aria-label="Twitter" className="fab fa-twitter mx-2"></a>
                <a href="https://youtube.com" aria-label="YouTube" className="fab fa-youtube mx-2"></a>
                <a href="https://instagram.com" aria-label="Instagram" className="fab fa-instagram mx-2"></a>
                <a href="https://tiktok.com" aria-label="TikTok" className="fab fa-tiktok mx-2"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
