import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";

export default function Related() {
    const [products, setProducts] = useState([]);
    const { category } = useParams();



    function fetchRelatedProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
        
    }
    const { data, error, isLoading } = useQuery({
        queryKey: ["relatedProducts"],
        queryFn: fetchRelatedProducts,
        select : (data) => data.data.data.filter((product) => product.category.name === category
    ,)});

    if (isLoading) return <Loader />;
    if (error) return <p>Error loading products: {error.message}</p>;
    return (
        <section className="py-20">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-8">Related Products</h1>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ">
                        {data.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
