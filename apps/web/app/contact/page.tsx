import React from "react";

const contactMethods = [
  {
    icon: (
      <svg className="w-10 h-10 text-[#5a7c5e]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7.5M21 10.5l-9 4.5-9-4.5M21 10.5v7a2 2 0 01-2 2h-7.5" /></svg>
    ),
    title: "Email Us",
    detail: "madhoorpureline@gmail.com",
    action: (
      <a href="mailto:madhoorpureline@gmail.com" className="text-[#5a7c5e] font-bold hover:underline">Send Email ↗</a>
    ),
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#5a7c5e]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.72 12.06a11.05 11.05 0 01-4.78-4.78l2.2-2.2a1 1 0 00.24-1.05l-1-3A1 1 0 0012.07 1H7a2 2 0 00-2 2v3a16 16 0 0016 16h3a2 2 0 002-2v-5.07a1 1 0 00-.73-.96l-3-1a1 1 0 00-1.05.24l-2.2 2.2z" /></svg>
    ),
    title: "WhatsApp",
    detail: "Chat with us instantly",
    action: (
      <a href="https://wa.me/919423041414" target="_blank" rel="noopener noreferrer" className="text-[#5a7c5e] font-bold hover:underline">Open WhatsApp ↗</a>
    ),
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#5a7c5e]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: "Response Time",
    detail: "We typically respond within 24 hours",
    action: <span className="text-[#7a9b5c]">Mon - Sat, 9 AM - 6 PM IST</span>,
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#5a7c5e]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
    title: "Pan India Shipping",
    detail: "We ship across India",
    action: <span className="text-[#7a9b5c]">Free shipping on orders above ₹999</span>,
  },
];

const Contact = () => {
  return (
    <main className="bg-gradient-to-b from-[#dcd6c4] to-[#c9c0a8] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <h1 className="text-5xl font-extrabold text-center mb-4 text-[#1f3a2e]">Get in Touch</h1>
        <p className="text-center text-lg text-[#4a6b50] mb-12">Have questions? Reach out to us through any of the channels below.</p>
        <div className="max-w-2xl mx-auto bg-[#f5fbe9] rounded-3xl shadow-2xl border border-[#e8e0cc] p-10 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{boxShadow: '0 8px 40px 0 rgba(90,124,94,0.10)'}} />
          <h2 className="text-3xl font-extrabold text-[#1f3a2e] mb-2 tracking-tight drop-shadow">Contact Information</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#5a7c5e] to-[#7a9b5c] rounded mb-4 mx-auto" />
          <p className="text-[#4a6b50] mb-8 text-center text-lg">Reach out to us through any of these channels. We're here to help!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactMethods.map((method, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white rounded-2xl border border-[#e8e0cc] p-7 text-center transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-[#e8e0cc] hover:to-[#dcd6c4] group relative overflow-hidden"
                style={{boxShadow: '0 2px 16px 0 rgba(90,124,94,0.07)'}}
              >
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#e8e0cc] to-[#dcd6c4] shadow group-hover:from-[#5a7c5e] group-hover:to-[#7a9b5c] group-hover:scale-105 transition-all duration-300">
                  {React.cloneElement(method.icon, { className: 'w-8 h-8 text-[#5a7c5e] group-hover:text-white transition-colors duration-300' })}
                </div>
                <div className="text-lg font-bold text-[#1f3a2e] mb-1 group-hover:text-[#5a7c5e] transition-colors duration-300">{method.title}</div>
                <div className="text-[#4a6b50] mb-2">{method.detail}</div>
                <div>{method.action}</div>
                <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-[#5a7c5e] transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
