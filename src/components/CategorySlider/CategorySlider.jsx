import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  function fetchCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    select: (data) => data.data.data,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
  };

  if (isLoading) return <Loader />;

  if (error) return <p>Error loading categories: {error.message}</p>;
  return (
    <>
      <section className="py-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Categories</h1>
          {error ? (
            <p className="text-red-500 mt-4">{error}</p>
          ) : (
            <Slider {...settings} className="px-5">
              {data.map((category, index) => (
                <div key={category.id || index} className="w-1/6">
                  <img
                    className="mb-2 h-250 p-3 object-cover w-full"
                    src={category.image}
                    alt={category.name}
                  />
                  <h2 className="text-center">{category.name}</h2>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>
    </>
  );
}
