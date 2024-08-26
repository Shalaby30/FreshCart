import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Detector } from "react-detect-offline";
import AuthContextProvider from "./Context/Auth";
import CartContextProvider from "./Context/CartContext";
import WishListContextProvider from "./Context/WishlistContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 
// Lazy-loaded components
const LayoutLazy = lazy(() => import("./components/Layout/Layout"));
const HomeLazy = lazy(() => import("./components/Home/Home"));
const RegisterLazy = lazy(() => import("./components/Register/Register"));
const LoginLazy = lazy(() => import("./components/Login/Login"));
const CartLazy = lazy(() => import("./components/Cart/Cart"));
const ProductDetailsLazy = lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const ForgetPasswordLazy = lazy(() =>
  import("./components/ForgetPassword/ForgetPassword")
);
const CheckOutLazy = lazy(() => import("./components/CheckOut/CheckOut"));
const AllOrdersLazy = lazy(() => import("./components/Allorders/AllOrders"));
const CategoriesLazy = lazy(() => import("./components/Categories/Categories"));
const BrandsLazy = lazy(() => import("./components/Brands/Brands"));
const WishListLazy = lazy(() => import("./components/WishList/WishList"));
const Reset = lazy(() => import("./components/Reset/Reset"));
const ResetPassword = lazy(() =>
  import("./components/ResetPassword/ResetPassword")
);
const CategoryProductsLazy = lazy(() =>
  import("./components/CategoryProducts/CategoryProducts")
);
const BrandProductsLazy = lazy(() =>
  import("./components/BrandProducts/BrandProducts")
);

const SearchProductsLazy = lazy(() => import("./components/SearchProducts/SearchProducts"));

import Guard from "./components/Guard/Guard";
import Notfound from "./components/NotFound/Notfound";
import ProductDetails from "./components/ProductDetails/ProductDetails";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <LayoutLazy />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loader />}>
              <HomeLazy />
            </Suspense>
          ),
        },
        {
          path: "/Register",
          element: (
            <Suspense fallback={<Loader />}>
              <RegisterLazy />
            </Suspense>
          ),
        },
        {
          path: "/ForgotPassword",
          element: (
            <Suspense fallback={<Loader />}>
              <ForgetPasswordLazy />
            </Suspense>
          ),
        },
        {
          path: "/Products",
          element: (
            <Suspense fallback={<Loader />}>
              <SearchProductsLazy />
            </Suspense>
          ),
        },
        {
          path: "/categories/:categoryId",
          element: (
            <Suspense fallback={<Loader />}>
              <CategoryProductsLazy />
            </Suspense>
          ),
        },
        {
          path: "/brands/:brandId", 
          element: (
            <Suspense fallback={<Loader />}>
              <BrandProductsLazy />
            </Suspense>
          ),
        },
        {
          path: "/Reset",
          element: (
            <Suspense fallback={<Loader />}>
              <Reset />
            </Suspense>
          ),
        },
        {
          path: "/ResetPassword",
          element: (
            <Suspense fallback={<Loader />}>
              <ResetPassword />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<Loader />}>
              <Notfound />
            </Suspense>
          ),
        },
        {
          path: "/Categories",
          element: (
            <Suspense fallback={<Loader />}>
              <CategoriesLazy />
            </Suspense>
          ),
        },
        {
          path: "/brands",
          element: (
            <Suspense fallback={<Loader />}>
              <BrandsLazy />
            </Suspense>
          ),
        },
        {
          path: "/Login",
          element: (
            <Suspense fallback={<Loader />}>
              <LoginLazy />
            </Suspense>
          ),
        },
        {
          path: "/ProductDetails/:id/:category",
          element: ( <ProductDetails />),
          
        },
        {
          path: "/cart",
          element: (
            <Guard>
              <Suspense fallback={<Loader />}>
                <CartLazy />
              </Suspense>
            </Guard>
          ),
        },
        {
          path: "/checkout",
          element: (
            <Guard>
              <Suspense fallback={<Loader />}>
                <CheckOutLazy />
              </Suspense>
            </Guard>
          ),
        },
        {
          path: "/AllOrders",
          element: (
            <Guard>
              <Suspense fallback={<Loader />}>
                <AllOrdersLazy />
              </Suspense>
            </Guard>
          ),
        },
        {
          path: "/WishList",
          element: (
            <Guard>
              <Suspense fallback={<Loader />}>
                <WishListLazy />
              </Suspense>
            </Guard>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <Detector
        render={({ online }) =>
          !online && (
            <div className="fixed bottom-0 left-0 right-0 text-center py-2 z-50 text-sm font-medium bg-red-100 text-red-700">
              You are currently offline
            </div>
          )
        }
      />

      <AuthContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <ReactQueryDevtools />
            </QueryClientProvider>
            <ToastContainer />
          </CartContextProvider>
        </WishListContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
