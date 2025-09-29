import { WhyUsComp } from "./ui/whyUsComp";

export function WhyUs() {
  const whyus = [
    {
      quote:
        "No chemicals, no preservatives — just pure ingredients from nature.",
      name: "100% Natural",
    },
    {
      quote:
        "Extracted below 40°C to preserve nutrients, flavor, and aroma.",
      name: "Cold Pressed",
    },
    {
      quote:
        "We partner with local farmers for every raw material we use. Source A1 quality Groundnuts from Farmers.",
      name: "Ethically Sourced",
    },
    {
      quote:
        "We utilize only the best materials, meticulously hand crafting each product, which ensures incredible purity, taste, and legitness.",
      name: "Best Quality Products",
    },
  ];

  return <WhyUsComp whyus={whyus} autoplay />;
}