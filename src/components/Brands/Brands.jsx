import axios from "axios";
import React from "react";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Brands() {
  const navigate = useNavigate();

  const fetchBrands = () => axios.get("https://ecommerce.routemisr.com/api/v1/brands");

  const { data, error, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    select: (response) => response.data.data,
  });

  if (isLoading) return <Loader />;

  if (error) return <p>Error loading brands: {error.message}</p>;

  const handleBrandClick = (brandId) => {
    navigate(`/brands/${brandId}`);
  };

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Brands</title> 
      </Helmet>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.map((brand) => (
          <div key={brand._id}>
            <img
              src={brand.image}
              onClick={() => handleBrandClick(brand._id)}
              className="mb-2 hover:scale-110 transition-all p-3 object-cover w-full cursor-pointer"
              alt={brand.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
