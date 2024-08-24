import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Related from "../Related/Related";
import Slider from "react-slick";
import { CartContext } from "./../../Context/CartContext";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetails() {

  const { id } = useParams();
  const { addtoCart } = useContext(CartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function fetchProductDetail() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ["productDetail"],
    queryFn: fetchProductDetail,
    select: (data) => data.data.data,
  });

  if (isLoading) return <Loader />;

  if (error) return <p>Error loading product: {error.message}</p>;

  async function addProductCart(productId) {
    await addtoCart(productId);
  }

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="row">
              <div className="w-1/3">
                <Slider {...settings} className="px-5">
                  {data.images?.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={data.title}
                      className="w-full"
                    />
                  ))}
                </Slider>
              </div>
              <div className="w-2/3">
                <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
                <p className="mb-4">{data.description}</p>
                <div className="flex justify-between text-gray-500 font-light">
                  <div>
                    <p className="mr-2">{data.category?.name}</p>
                    <span>{data.price} EGP</span>
                  </div>
                  <div className="mt-auto">
                    <i className="fas fa-star text-yellow-300"></i>
                    <span>{data.ratingsAverage}</span>
                  </div>
                </div>

                <button
                  onClick={() => addProductCart(data.id)}
                  className="bg-green-500 w-full mt-2 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Related />
    </>
  );
}
