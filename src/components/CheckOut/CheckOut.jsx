import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  const { getPayment, CartId } = useContext(CartContext);
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    details: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
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
    onSubmit: cashPayment,
  });

  async function visaPayment(values) {
    setError(null);

    const url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:5173`;

    try {
      const res = await getPayment(url, values);
      if (res.status === "success") {
        console.log(res);
        console.log("hi from checkout");
        window.location.href = res.session.url;

        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      } else {
        setError(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function cashPayment(values) {
    setError(null);

    const url = `https://ecommerce.routemisr.com/api/v1/orders/${CartId}`;

    try {
      const res = await getPayment(url, values);
      if (res.status === "success") {
        console.log(res);
        console.log("hi from checkout");

        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
          <div className="flex flex-col justify-start items-start w-full space-y-9">
            <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
              <div className="p-8 bg-gray-100 flex flex-col mx-auto ">
                <button
                  onClick={() => visaPayment(formik.values)}
                  className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full duration-200"
                >
                  <p className="text-base leading-4">Pay with Visa</p>
                </button>

                <div className="flex flex-row justify-center items-center mt-6">
                  <hr className="border w-full" />
                  <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">
                    or pay with Cash
                  </p>
                  <hr className="border w-full" />
                </div>

                <form onSubmit={formik.handleSubmit} className="w-full mt-8">
                  <div className="mt-8">
                    <input
                      type="text"
                      name="details"
                      className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      placeholder="Details"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details}
                    />
                    {formik.touched.details && formik.errors.details ? (
                      <div className="text-red-500 text-sm mt-2">
                        {formik.errors.details}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8">
                    <input
                      type="text"
                      name="phone"
                      className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      placeholder="Phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-500 text-sm mt-2">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8">
                    <input
                      type="text"
                      name="city"
                      className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      placeholder="City"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                    />
                    {formik.touched.city && formik.errors.city ? (
                      <div className="text-red-500 text-sm mt-2">
                        {formik.errors.city}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="bg-gray-900 text-white hover:bg-gray-700 flex flex-row justify-center items-center py-4 rounded w-full"
                    >
                      Pay now
                    </button>
                  </div>
                </form>
                {error && <p className="text-red-600 mt-4">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
