import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters")
      .required("Required")
      .matches(/^[a-zA-Z\s]*$/, "Name must contain only letters and spaces"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Required"),
    phone: Yup.string()
      .matches(
        /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
        "Must use Egyptian phone number"
      )
      .required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  async function handleRegister(values) {
    console.log(values);
    setLoader(true);
    setError(null);
    setSuccess(false);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message === "success") {
        setSuccess(true);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-20 p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">Register</h1>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 mb-5 px-4 py-3 rounded relative flex items-center"
            role="alert"
          >
            <i className="fas fa-exclamation-circle mr-2"></i>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 mb-5 px-4 py-3 rounded relative"
            role="alert"
          >
            <p className="text-sm">
              Registration completed successfully! You can go to the{" "}
              <Link to="/login" className="underline text-green-600">
                Login page
              </Link>
              .
            </p>
          </div>
        )}

        <div className="w-full mb-6">
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm mb-2">
            Enter your name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block p-3 w-full text-sm text-gray-900 bg-transparent border rounded dark:text-white dark:border-gray-600 border-gray-300 focus:border-green-600"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>{formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className="w-full mb-6">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm mb-2">
            Enter your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block p-3 w-full text-sm text-gray-900 bg-transparent border rounded dark:text-white dark:border-gray-600 border-gray-300 focus:border-green-600"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>{formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="w-full mb-6">
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm mb-2">
            Enter your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block p-3 w-full text-sm text-gray-900 bg-transparent border rounded dark:text-white dark:border-gray-600 border-gray-300 focus:border-green-600"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>{formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="w-full mb-6">
          <label htmlFor="rePassword" className="block text-gray-700 dark:text-gray-300 text-sm mb-2">
            Confirm your password
          </label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="block p-3 w-full text-sm text-gray-900 bg-transparent border rounded dark:text-white dark:border-gray-600 border-gray-300 focus:border-green-600"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>{formik.errors.rePassword}
            </div>
          ) : null}
        </div>

        <div className="w-full mb-6">
          <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 text-sm mb-2">
            Enter your phone number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block p-3 w-full text-sm text-gray-900 bg-transparent border rounded dark:text-white dark:border-gray-600 border-gray-300 focus:border-green-600"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>{formik.errors.phone}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 text-white bg-green-600 rounded-lg ${
            loader ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loader}
        >
          {loader ? (
            <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin mx-auto"></div>
          ) : (
            "Register"
          )}
        </button>

        <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 underline dark:text-green-500">
            Login here
          </Link>
        </p>
      </form>
    </>
  );
}
