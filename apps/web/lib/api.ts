
import { api } from "./axios";



export async function getProducts() {
  // const res = await api.get("product");
  // return res.data.data;

  // Returning static data as per user request
  return [
    {
      id: "1",
      name: "Hydraulic Cold Press Groundnut Oil",
      description: "Available in 1, 5, 15 lit pack. Hydraulic cold pressed groundnut oil. Retains natural flavor and nutrients. Heart-healthy and perfect for Indian cooking.",
      price: 360,
      originalPrice: 450,
      unit: "1 Litre",
      imageUrl: "/assets/productImages/groundnutOil.png",
      inStock: true,
      categoryId: "oil",
      ingredientsText: "100% Pure Groundnuts",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Natural Jaggery",
      description: "Available in 1 kg and 15 kg box. Pure, chemical-free jaggery blocks made from the finest sugarcane. Rich in minerals and perfect for daily consumption.",
      price: 90,
      originalPrice: 144,
      unit: "1 Kg",
      imageUrl: "/assets/productImages/jaggery.png",
      inStock: false,
      outOfStockMessage: "Will be available soon",
      categoryId: "jaggery",
      ingredientsText: "100% Organic Sugarcane Juice",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // {
    //   id: "3",
    //   name: "Jaggery Powder",
    //   description: "1 kg pack. Convenient and natural jaggery powder. Excellent natural sweetener for tea, coffee, and desserts.",
    //   price: 90,
    //   originalPrice: 144,
    //   imageUrl: "/assets/productImages/jaggery-powder.png",
    //   stock: 30,
    //   categoryId: "jaggery",
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString()
    // },
    // {
    //   id: "4",
    //   name: "Jaggery Cube",
    //   description: "500 gm pack. Delicious jaggery cubes, perfect for on-the-go sweetness and portion control.",
    //   price: 60,
    //   originalPrice: 90,
    //   imageUrl: "/assets/productImages/sweet-pure-combo.png",
    //   stock: 25,
    //   categoryId: "jaggery",
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString()
    // }
  ];
}

export async function getOneProduct(id: string) {
  // Find basic info from static array, or use a default
  const products = await getProducts();
  const product = products.find(p => p.id === id) || products[0];

  if (!product) {
    return null;
  }

  if (product.id === "1") {
    return {
      ...product,
      images: [
        product.imageUrl,
        "/assets/productImages/groundnutOil2.jpeg"
      ],
      longDescription: `Experience the finest Hydraulic Cold Press Groundnut Oil, extracted mechanically at controlled temperatures without chemical solvents. This preserves natural nutrients, antioxidants, and its original flavor profile. Perfect for all your culinary needs.`,
      howToUse: [
        { title: "Daily Cooking & Sautéing", desc: "Ideal for everyday Indian cooking, tadkas, and stir-frying due to its stable nature under heat." },
        { title: "Deep Frying", desc: "It has a high smoke point, making it perfect for crispy frying without breaking down or absorbing food flavors." },
        { title: "Baking & Grilling", desc: "Use it as a neutral, healthy fat base for grilling vegetables or baking." },
        { title: "Traditional Dressings", desc: "Adds a subtle, authentic nutty aroma when drizzled over regional salads or used to make local spice pastes." }
      ],
      faqs: [
        { q: "What is hydraulic press extraction?", a: "It is a traditional, mechanical method that uses steady hydraulic pressure to squeeze oil out of groundnut seeds. Unlike modern solvent extraction, it uses absolutely no chemicals, keeping the oil 100% pure, thick, and aromatic." },
        { q: "Does this oil contain any added chemicals or preservatives?", a: "No. This oil is entirely free from artificial colors, preservatives, anti-foaming agents, or mineral oils. It is packed exactly the way it is extracted." },
        { q: "Why is there some sediment at the bottom of the bottle?", a: "Light sedimentation is a natural characteristic of raw, unfiltered oils. It is solid proof that the oil has not undergone harsh chemical bleaching or heavy processing." },
        { q: "Can I reuse this oil for deep frying?", a: "Because it is naturally stable, it can be reused a couple of times for frying. Simply filter out any food particles after it cools down. However, for maximum health benefits, avoid reheating it excessively." }
      ],
      benefits: [
        { title: "Pure Hydraulic Extraction", desc: "Extracted mechanically at controlled temperatures without chemical solvents, preserving natural nutrients, antioxidants, and original flavor profiles." },
        { title: "Heart-Healthy Fats", desc: "Rich in Monounsaturated Fatty Acids (MUFA) and Polyunsaturated Fatty Acids (PUFA), which help maintain healthy cholesterol levels." },
        { title: "Naturally Zero Cholesterol", desc: "A great alternative for a heart-conscious lifestyle." },
        { title: "Deep Nourishment", desc: "Packed with Vitamin E, a natural antioxidant that supports skin health and boosts overall immunity." }
      ],
      ingredientsText: "100% Pure Hydraulic-Pressed Groundnut Oil (extracted from premium quality groundnut seeds).",
      storageConditions: [
        "Store in a cool, dry area away from direct sunlight and heat sources to preserve its freshness.",
        "Ensure the bottle cap is tightly closed after every use to prevent exposure to air and moisture.",
        "Avoid introducing moisture or water into the container to maximize its natural shelf life."
      ],
      useCases: [
        { title: "Daily Cooking", img: "/assets/oil/daily_cooking.png" },
        { title: "Traditional Tadka", img: "/assets/oil/traditional_tadka.png" },
        { title: "Crispy Frying", img: "/assets/oil/crispy_frying.png" },
        { title: "Healthy Meals", img: "/assets/oil/healthy_meals.png" },
        { title: "Rich Flavor", img: "/assets/oil/rich_flavor.png" },
        { title: "Family Nutrition", img: "/assets/oil/family_nutrition.png" }
      ]
    };
  }

  return {
    ...product,
    images: product.id === "2"
      ? [product.imageUrl, "/assets/productImages/jaggery2.png"]
      : [product.imageUrl],
    longDescription: `Introducing Madhoor’s finest-quality superfine jaggery powder, the epitome of pure sweetness and wholesome goodness! Experience the true essence of sweetness with our natural jaggery powder, the perfect natural sweetener for your everyday needs.

Derived from the sap of organic sugarcane, Madhoor’s jaggery powder is a natural and unrefined sweetener, free from any harmful additives or chemicals. Our powder is a perfect replacement for refined sugar, as it is rich and possesses a smooth texture and caramel-like flavour.

Our commitment to chemical-free farming practices ensures that every batch of our natural jaggery powder is produced sustainably and without harming the environment. Our products do not involve synthetic fertilisers or pesticides. Hence, our Jaggery powder will remain not only delicious but also environmentally friendly.

Our natural jaggery powder will surely win the hearts of health-conscious people and individuals who appreciate authentic and natural flavours. It's loaded with essential minerals and nutrients that are often stripped away by refined sugar, making it a healthier option.

Indulge guilt-free in the goodness of Madhoor’s superfine Jaggery powder! The free flowing nature and easy dissolution of our jaggery powder allows you to experiment and explore various culinary delights.

Embrace the rich taste, countless health benefits, and satisfaction of choosing the best jaggery powder available.`,
    howToUse: [
      { title: "Daily Sweetener", desc: "A perfect, healthy replacement for refined white sugar in your daily tea, coffee, and milk." },
      { title: "Traditional Sweets", desc: "Ideal for making traditional Indian delicacies like kheer, puran poli, laddoos, and chikki." },
      { title: "Baking & Cooking", desc: "Melt it easily into syrups for baking, or use a small pinch to balance flavors in regional dals and curries." },
      { title: "Direct Consumption", desc: "Enjoy a small piece post-meals as a traditional, digestion-boosting sweet treat." }
    ],
    faqs: [
      { q: "What is an indirect heating system?", a: "Unlike traditional open-fire methods where sugarcane juice is heated directly (often causing overheating and nutrient loss), indirect heating uses a controlled steam jacketed system. This cooks the juice evenly at optimal temperatures, maintaining its pure taste, natural color, and complete nutritional profile without any burnt aftertaste." },
      { q: "Why does the color of organic jaggery vary?", a: "Because we do not use chemical bleaching agents or artificial colors, the shade of the jaggery depends entirely on the natural maturity and variety of the harvested sugarcane. It can range from golden yellow to dark brown." },
      { q: "Is this jaggery safe for individuals with diabetes?", a: "While organic jaggery is far healthier than refined white sugar due to its mineral content, it is still a carbohydrate that affects blood sugar levels. We recommend consulting a healthcare professional for specific dietary management." },
      { q: "Does it contain any added salt or preservatives?", a: "No. This is 100% pure organic sugarcane juice concentrate with absolutely no added salt, chemical preservatives, or fillers." }
    ],
    benefits: [
      { title: "100% Organic", desc: "Made from premium sugarcane grown entirely without synthetic pesticides or chemical fertilizers." },
      { title: "Indirect Heating System", desc: "Processed using modern indirect steam/heating technology, which eliminates the risk of charring, ensures uniform cooking, and perfectly preserves the natural vitamins and minerals." },
      { title: "Chemical-Free Processing", desc: "Clarified using natural vegetable clarifiers rather than harmful chemical bleaching agents like hydros (sodium hydrosulfite)." },
      { title: "Rich in Micronutrients", desc: "Naturally packed with iron, magnesium, potassium, and antioxidants that help boost energy and support immunity." }
    ],
    ingredientsText: "100% Organic Sugarcane Juice.",
    storageConditions: [
      "Transfer to a clean, dry, airtight container immediately after opening to protect it from moisture and humidity.",
      "Store in a cool, dry area away from direct sunlight. Refrigeration is highly recommended during hot and humid seasons to prevent melting or stickiness.",
      "Always use a completely dry spoon to scoop out the jaggery to ensure a long, spoil-free shelf life."
    ],
    useCases: [
      { title: "Daily Cooking", img: "/assets/jaggery/daily_cooking.png" },
      { title: "Chai", img: "/assets/jaggery/chai.png" },
      { title: "Coffee", img: "/assets/jaggery/coffee.png" },
      { title: "Immunity", img: "/assets/jaggery/immunity.png" },
      { title: "Baking", img: "/assets/jaggery/baking.png" },
      { title: "Kids", img: "/assets/jaggery/kids.png" }
    ]
  };
}
