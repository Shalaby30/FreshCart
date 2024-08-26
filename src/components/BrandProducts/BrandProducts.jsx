import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function BrandProducts() {
  const { brandId } = useParams();

  const fetchBrandDetails = async () => {
    const [brandResponse, productsResponse] = await Promise.all([
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`),
      axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`),
    ]);
    return {
      brand: brandResponse.data.data,
      products: productsResponse.data.data,
    };
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["brandProducts", brandId],
    queryFn: fetchBrandDetails,
  });

  if (isLoading) return <Loader />;

  if (error) return <p>Error loading products: {error.message}</p>;

  const { brand, products } = data;

  return (
    <section className="py-20 container mx-auto">
      <Helmet>
        <title> {brand.name}</title>
        <meta name="description" content={`Explore products from the brand ${brand.name}`} />
      </Helmet>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
