import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

export default function Related() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { category } = useParams();

    async function GetRelatedProducts() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
            const relatedProducts = data.data.filter((product) => product.category.name === category);
            setProducts(relatedProducts);
            setError(null);
        } catch (error) {
            console.log(error);
            setError(error.response .data.message);
            setProducts([]);
        }
    }

    useEffect(() => {
        GetRelatedProducts();
    }, []); 

    return (
        <section className="py-20">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-8">Related Products</h1>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ">
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
