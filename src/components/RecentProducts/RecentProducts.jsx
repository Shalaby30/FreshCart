import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Product from "../Product/Product";

export default function RecentProducts() {
  const [products, setProduct] = useState([]);
  const [error, seterror] = useState();

  async function GetProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProduct(data.data);
      seterror(null);
    } catch (error) {
      console.log(error);
      seterror(error.response.data.message);
      setProduct([]);
    }
  }

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-8">Recent Products</h1>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.slice(0, 20).map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
