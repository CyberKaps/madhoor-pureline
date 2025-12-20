

export const products = [
  {
    id: 1,
    title: "Groundnut oil (1 ltr)",
    price: "Rs.400",
    image: "/assets/productImages/product1.jpeg",
    tags: ["OIL", "COLD PRESSED", "PURE"],
    highlight: "Best Seller",
    description: "Premium cold-pressed groundnut oil made from A1-grade peanuts. No chemicals, no palm oil, no added water. Retains natural flavor and nutrients.",
    // packOptions: [
    //   { label: "1 Litre", price: "Rs.400" },
    //   { label: "5 Litre", price: "Rs.1400" }
    // ]
  },
  {
    id: 2,
    title: "Groundnut oil (5 ltr)",
    price: "Rs.1400",
    image: "/assets/productImages/product3.jpeg",
    tags: ["OIL", "COLD PRESSED", "FAMILY PACK"],
    highlight: "Family Value",
    description: "Bulk pack of our signature cold-pressed groundnut oil. Perfect for families and regular use. Zero chemicals, zero palm oil, zero added water.",
    // packOptions: [
    //   { label: "5 Litre", price: "Rs.1400" },
    //   { label: "1 Litre", price: "Rs.400" }
    // ]
  },
  {
    id: 3,
    title: "Jaggery (1 kg)",
    price: "Rs. 60",
    image: "/assets/productImages/product2.jpeg",
    tags: ["JAGGERY", "ORGANIC", "NATURAL"],
    highlight: "Pure & Natural",
    description: "Traditional jaggery made from organic sugarcane. Unrefined, chemical-free, and rich in minerals. Sweeten your food the healthy way.",
    // packOptions: [
    //   { label: "1 Kg", price: "Rs. 60" }
    // ]
  },
];

export const getProductById = (id: string) => {
    return products.find(p => p.id === Number(id));
};