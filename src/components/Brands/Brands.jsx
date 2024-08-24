import axios from "axios";
import React from "react";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import {Helmet} from "react-helmet";


export default function Brands() {
  function fetchBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    select : (data) => data.data.data
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading brands: {error.message}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-8">Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.map((brand) => (
          <div key={brand._id}>
            <img
              src={brand.image}
              onClick={() => console.log(brand.name)}
              className="mb-2 hover:scale-110 transition-all p-3 object-cover w-full"
              alt={brand.name}
            />
          </div>
        ))}
      </div>

      <Helmet>
        <title>Brands</title>
      </Helmet>
    </div>
  );
}
