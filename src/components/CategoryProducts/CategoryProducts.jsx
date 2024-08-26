import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function CategoryProducts() {
  const { categoryId } = useParams();

  async function fetchCategoryDetails() {
    const [categoryResponse, productsResponse] = await Promise.all([
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`),
      axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`),
    ]);
    return {
      category: categoryResponse.data.data,
      products: productsResponse.data.data,
    };
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["categoryProducts", categoryId],
    queryFn: fetchCategoryDetails,
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading products: {error.message}</p>;

  const { category, products } = data;

  return (
    <section className="container mx-auto py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <Helmet>
        <title>{category.name}</title>
      </Helmet>
    </section>
  );
}
