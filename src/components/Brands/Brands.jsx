import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
export default function Brands() {
  const [Brands, setBrands] = useState([]);
  async function getBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-8">Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Brands.map((brand) => (
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
    </div>
  );
}
