import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  function fetchCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    select: (data) => data.data.data,
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading categories: {error.message}</p>;

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((category) => (
          <div key={category._id}>
            <img
              src={category.image}
              onClick={() => handleCategoryClick(category._id)}
              className="mb-2 h-250 hover:scale-110 transition-all p-3 object-cover w-full cursor-pointer"
              alt={category.name}
            />
            <h3 className="text-center">{category.name}</h3>
          </div>
        ))}
      </div>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Discover our wide range of fresh, organic products" />
      </Helmet>
    </section>
  );
}
