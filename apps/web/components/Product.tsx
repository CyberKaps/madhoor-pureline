import React from "react";
import { Button } from "./ui/button";

const products = [
  {
    id: 1,
    title: "Groundnut oil (1 ltr)",
    price: "Rs.400",
    image: "/assets/productImages/product1.jpeg", 
  },
  {
    id: 2,
    title: "Groundnut oil (5 ltr)",
    price: "Rs.1400",
    image: "/assets/productImages/product3.jpeg",
  },
  {
    id: 3,
    title: "Jaggery (1 kg)",
    price: "Rs. 60",
    image: "/assets/productImages/product2.jpeg",
  },
];

export default function ShopSeasonProduce() {
  return (
    <section className="bg-[#d4e8c5] py-12 px-6 md:px-20">
      <div className="flex justify-center">
        <h2 className=" text-2xl md:text-3xl font-semibold text-[#1e3c36] mb-6 border-b border-[#1e3c36] inline-block pb-1">
        {/* Shop Season's Produce */} Our Products
      </h2>
      </div>

      <div className="md:flex gap-12 justify-center mb-10">
        {products.map((product) => (
          <div key={product.id} className="max-w-xs group cursor-pointer relative">
            
            <img
              src={product.image}
              alt={product.title}
              className="w-fit h-64 object-cover rounded-"
            />

            {/* Quick View overlay on hover */}
            {/* <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 backdrop-blur-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 py-2 text-sm text-gray-700">
              Quick View
            </div> */}

            <div className="mt-3 text-[#1e3c36]">
              <h3 className="text-base font-medium">{product.title}</h3>
              <p className="text-sm">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="brand" size="default" className="rounded-full px-6">
          Order Online
        </Button>
      </div>
    </section>
  );
}
