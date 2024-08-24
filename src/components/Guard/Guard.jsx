import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Guard({ children }) {
  if (!localStorage.getItem("Token")) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center">
          <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h1 class="text-2xl font-bold text-green-800 mb-4">
              Please log in to access this page:
            </h1>
            <p class="text-gray-600 mb-6">
              {" "}
              If you don’t have an account,{" "}
              <a
                href="/signup"
                class="text-green-600 font-semibold hover:underline"
              >
                sign up here
              </a>
              .
            </p>
            <Link
              href="/login"
              class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Log In
            </Link>
          </div>
          <Helmet>
            <meta name="description" content="FreshCart" />
            <title>FreshCart</title>
          </Helmet>
        </div>
      </>
    );
  }
  return children;
}
