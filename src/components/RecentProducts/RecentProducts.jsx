import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Product from "../Product/Product";

const fetchRecentProducts = async () => {
  const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  return response.data;
};

export default function RecentProducts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: fetchRecentProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">Recent Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.data.slice(0, 20).map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
