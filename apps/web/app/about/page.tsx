
"use client"

function page() {
  return (
    <main className="bg-[#e3f2d2] min-h-screen text-[#243629]">
      {/* Hero Section */}
      <section className="bg-cover bg-center py-20 px-6 md:px-20"
        style={{ backgroundImage: "url('/assets/bg-fields.jpg')" }} // replace with your background image
      >
        <div className="bg-black/40 p-8 md:p-12 rounded-xl max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Madhoor Pureline</h1>
          <p className="text-lg">
            Welcome to Madhoor Pureline, where purity meets health. Founded in 2024,
            we are committed to crafting wholesome, chemical-free food products
            that nourish both body and soul.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-6 border-b-4 border-[#f57c3b] inline-block">
          Our Story & Vision
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          We are a proud extension of <strong>Madhur Jaggery (Krishna Organic Agro Products)</strong> —
          a trusted name in organic jaggery since 1999. With decades of experience
          and a strong foundation built on integrity and innovation, we carry forward
          a legacy of natural, high-quality food production.
        </p>
        <p className="text-lg leading-relaxed">
          In our expansion into the edible oil industry, we specialize in
          <strong> Hydraulic Cold Pressed Oils</strong> made from carefully selected,
          A1-grade raw materials. Our oils are free from preservatives, added water,
          and palm oil, crafted with an indirect heating method that retains essential
          nutrients and natural flavors — just as nature intended.
        </p>
      </section>

      {/* Why Choose Us */}
        <section className="bg-[#243629] text-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[#f57c3b]">
            Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
            {
                title: "100% Organic & Naturally Processed",
                desc: "Made from premium, locally grown ingredients."
            },
            {
                title: "Cold Press Technology",
                desc: "Retains nutrients and natural flavors."
            },
            {
                title: "Eco-Friendly & Hygienic",
                desc: "Food-grade packaging with quality-controlled manufacturing."
            },
            {
                title: "Zero Water Processing",
                desc: "We never add water or moisture content during processing."
            }
            ].map((item, index) => (
            <div
                key={index}
                className="bg-[#2f4736] rounded-xl p-6 shadow-md transition-all duration-300 
                        hover:scale-105 hover:shadow-xl hover:bg-[#355a42] hover:text-[#f57c3b]"
            >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p>{item.desc}</p>
            </div>
            ))}
        </div>
        </section>

      {/* Mission */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-6 border-b-4 border-[#f57c3b] inline-block">
          Our Mission
        </h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          Our mission is to honor traditional practices while embracing modern innovation
          to deliver the finest quality products to your table.
        </p>
      </section>
    </main>
  )
}

export default page