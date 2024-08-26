import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Related from "../Related/Related";
import Slider from "react-slick";
import { CartContext } from './../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  const [product, setProductDetail] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addtoCart } = useContext(CartContext);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function GetProductDetail(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetail(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "An error occurred");
      setProductDetail({});
    }
  }

  useEffect(() => {
    GetProductDetail(id);
  }, [id]);

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
                  {product.images?.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={product.title}
                      className="w-full"
                    />
                  ))}
                </Slider>
              </div>
              <div className="w-2/3">
                <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                <p className="mb-4">{product.description}</p>
                <div className="flex justify-between text-gray-500 font-light">
                  <div>
                    <p className="mr-2">{product.category?.name}</p>
                    <span>{product.price} EGP</span>
                  </div>
                  <div className="mt-auto">
                    <i className="fas fa-star text-yellow-300"></i>
                    <span>{product.ratingsAverage}</span>
                  </div>
                </div>

                <button
                  onClick={() => addProductCart(product.id)}
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

      <Helmet>
        <title>{product.title}</title>
      </Helmet>
    </>
  );
}
