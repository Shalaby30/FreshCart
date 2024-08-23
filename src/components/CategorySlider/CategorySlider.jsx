import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  async function getCategory() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategory(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
      setCategory([]); 
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <section className="py-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Categories</h1>
          {error ? (
            <p className="text-red-500 mt-4">{error}</p>
          ) : (
            <Slider {...settings} className="px-5">
              {category.map((category, index) => (
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
