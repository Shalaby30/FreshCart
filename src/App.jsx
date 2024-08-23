import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import AuthContextProvider from "./Context/Auth";
import Cart from "./components/Cart/Cart";
import Guard from "./components/Guard/Guard";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/Allorders/AllOrders";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import WishListContextProvider from "./Context/WishlistContext";
import WishList from "./components/WishList/WishList";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "/Categories",
          element: <Categories />,
        },
        {
          path: "/brands",
          element: <Brands />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/ProductDetails/:id/:category",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: (
            <Guard>
              <Cart />
            </Guard>
          ),
        },
        {
          path: "/checkout",
          element: (
            <Guard>
              <CheckOut />
            </Guard>
          ),
        },
        {
          path: "/AllOrders",
          element: (
            <Guard>
              <AllOrders />
            </Guard>
          ),
        },
        {
          path: "/WishList",
          element: (
            <Guard>
              <WishList />
            </Guard>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </CartContextProvider>
        </WishListContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
