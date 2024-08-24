import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from './../../Context/Auth';
import {Helmet} from "react-helmet";


export default function ResetPassword() {
  const initialValues = {
    email: "",
    newPassword: "",
  };
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { access, setAccess } = useContext(AuthContext);
  
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    newPassword: Yup.string()
      .min(6, "newPassword must be at least 6 characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleNewPassword,
  });

  async function handleNewPassword(values) {
    console.log(values);
    setLoader(true);
    setError(null);  
    setSuccess(false);  
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      if (data.token) {
      console.log(data);
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
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-20 p-8 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">ResetPassword</h1>
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
            <div className="flex items-center">

            <i className="fas fa-check-circle mr-2"></i>
            <p className="text-sm">Success you can now <Link to="/login" className="text-blue-500">login</Link></p>
            </div>
          </div>
        )}

        <div className="relative z-0 w-full mb-6">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-500 dark:text-gray-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block p-3 w-full text-sm text-gray-900 bg-transparent border rounded dark:text-white dark:border-gray-600 border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600"
            placeholder=" "
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

        <div className="relative z-0 w-full mb-6">
          <label htmlFor="newPassword" className="block mb-2 text-sm text-gray-500 dark:text-gray-400">
            newPassword
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="block p-3 w-full text-sm text-gray-900 bg-transparent border rounded dark:text-white dark:border-gray-600 border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>{formik.errors.newPassword}
            </div>
          ) : null}
        </div>

       
        
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 ease-in-out dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {loader ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
        </div>
      </form>
      <Helmet>
        <title>Login</title>
      </Helmet>
    </>
  );
}
