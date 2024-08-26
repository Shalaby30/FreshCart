import React, { useState, useContext } from "react";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  const { access, setAccess } = useContext(AuthContext);
  const { cartNum } = useContext(CartContext);
  const { wishNum } = useContext(WishlistContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("Token");
    setAccess(null);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <>
      <div className="w-full bg-gray-100 fixed z-50 top-0 left-0">
        <nav className="container mx-auto py-2 flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="navbar-burger flex items-center text-blue-600 p-3"
            >
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
            <li>
              <NavLink to="/" className="mx-1 p-1">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="mx-1 p-1">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className="mx-1 p-1">
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/brands" className="mx-1 p-1">
                Brands
              </NavLink>
            </li>
          </ul>
          <div className=" items-center space-x-2 hidden lg:flex">
            {access && (
              <>
                <NavLink to="/cart" className="relative p-1">
                  <button
                    type="button"
                    className="relative inline-flex items-center p-3 text-sm"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className="sr-only">Cart</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-green-400 border-2 border-white rounded-full -top-2 -right-2">
                      {cartNum}
                    </div>
                  </button>
                </NavLink>
                <NavLink to="/wishlist" className="relative p-1">
                  <button
                    type="button"
                    className="relative inline-flex items-center p-3 text-sm"
                  >
                    <i className="fas fa-heart"></i>
                    <span className="sr-only">Wishlist</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-green-400 border-2 border-white rounded-full -top-2 -right-2">
                      {wishNum}
                    </div>
                  </button>
                </NavLink>
                <Link to="#" className="mx-1 p-1" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            )}
            {!access && (
              <>
                <NavLink to="/login" className="mx-1 p-1">
                  Sign in
                </NavLink>
                <NavLink to="/register" className="mx-1 p-1">
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </nav>
        <div
          className={`navbar-menu relative z-50 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            onClick={toggleMobileMenu}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <Link to="/" className="mr-auto text-3xl font-bold leading-none">
                <img src={logo} alt="Logo" />
              </Link>

              <button className="navbar-close" onClick={toggleMobileMenu}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div>
              <ul>
                <li>
                  <NavLink to="/" className="mx-1 p-1">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="mx-1 p-1">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className="mx-1 p-1">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/brands" className="mx-1 p-1">
                    Brands
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                {access && (
                  <>
                    <NavLink to="/cart" className="relative p-1">
                      <button
                        type="button"
                        className="relative inline-flex items-center p-3 text-sm"
                      >
                        <i className="fas fa-shopping-cart"></i>
                        <span className="sr-only">Cart</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-green-400 border-2 border-white rounded-full -top-2 -right-2">
                          {cartNum}
                        </div>
                      </button>
                    </NavLink>
                    <NavLink to="/wishlist" className="relative p-1">
                      <button
                        type="button"
                        className="relative inline-flex items-center p-3 text-sm"
                      >
                        <i className="fas fa-heart"></i>
                        <span className="sr-only">Wishlist</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-green-400 border-2 border-white rounded-full -top-2 -right-2">
                          {wishNum}
                        </div>
                      </button>
                    </NavLink>
                    <Link to="#" className="mx-1 p-1" onClick={handleLogout}>
                      Logout
                    </Link>
                  </>
                )}
                {!access && (
                  <>
                    <NavLink to="/login" className="mx-1 p-1">
                      Sign in
                    </NavLink>
                    <NavLink to="/register" className="mx-1 p-1">
                      Sign up
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
