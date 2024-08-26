import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";

export default function SearchProducts() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products = [], error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/products').then(res => res.data.data)
  });

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <section className='text-center container mx-auto'>
      <h1 className='text-2xl font-bold mb-8'>Search Products</h1>

      <input
        placeholder='Search Products'
        className='border border-gray-300 p-2 rounded-md w-full mb-5'
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {filteredProducts.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
