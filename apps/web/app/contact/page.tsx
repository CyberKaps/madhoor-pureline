"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, MapPin, Send, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import PageHero from "../../components/PageHero";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // For static exports (like Netlify's 'out' folder), the key MUST be on the frontend.
    // Web3Forms keys are designed to be public. Protect it by setting allowed domains in your Web3Forms dashboard.
    formData.append("access_key", "caa7f1e8-c3a4-45b9-aa15-87de33259f4b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000); // Reset after 5 seconds
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const contactCards = [
    { icon: Mail, title: "Email Us", content: <a href="mailto:madhoorpureline@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">madhoorpureline@gmail.com</a> },
    { icon: MessageCircle, title: "WhatsApp", content: <a href="https://wa.me/919834452105" className="text-muted-foreground hover:text-primary transition-colors">+91 9834452105</a> },
    { icon: Clock, title: "Response Time", content: <p className="text-muted-foreground">Mon - Sat<br />9:00 AM - 6:00 PM</p> },
    { icon: MapPin, title: "Location", content: <p className="text-muted-foreground">Shipping pure sweetness across all of India</p> },
  ];

  return (
    <main className="bg-background min-h-screen">
      <PageHero
        badge="Get in Touch"
        title="Let's"
        highlight="Connect"
        subtitle="Have questions about our pure, natural products? We're here to help you on your wellness journey."
        image="/assets/hero/contact.webp"
      />

      <div className="container mx-auto px-6 max-w-7xl pt-12 md:pt-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {contactCards.map(({ icon: Icon, title, content }) => (
                <div key={title} className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
                  {content}
                </div>
              ))}
            </div>

            {/* Google Map */}
            <div className="w-full h-80 bg-muted rounded-3xl overflow-hidden shadow-sm border border-border relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.491235072155!2d75.78789577551095!3d20.852241293817514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd99f0074a40df3%3A0x6da9d81c1ba7e693!2sMadhoor%20Pureline!5e0!3m2!1sen!2sin!4v1768941892187!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-card rounded-2xl p-8 md:p-14 shadow-lg border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-bl-full pointer-events-none opacity-60"></div>

              <h2 className="text-3xl font-bold text-foreground mb-8 font-serif">Send us a Message</h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary tracking-wider uppercase">First Name</label>
                    <input type="text" name="first_name" required className="w-full bg-background border border-border rounded-[20px] px-4 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary tracking-wider uppercase">Last Name</label>
                    <input type="text" name="last_name" required className="w-full bg-background border border-border rounded-[20px] px-4 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary tracking-wider uppercase">Email Address</label>
                  <input type="email" name="email" required className="w-full bg-background border border-border rounded-[20px] px-4 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary tracking-wider uppercase">Message</label>
                  <textarea name="message" required rows={5} className="w-full bg-background border border-border rounded-[20px] px-4 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-foreground" placeholder="How can we help you?" />
                </div>

                <Button
                  disabled={status === "loading" || status === "success"}
                  className={`w-full h-14 rounded-[20px] text-lg font-medium shadow-md transition-all mt-4 ${status === "success"
                    ? "bg-leaf hover:bg-leaf text-leaf-foreground"
                    : "bg-primary hover:bg-[#7b5034] text-primary-foreground"
                    }`}
                  size="lg"
                >
                  {status === "loading" ? "Sending..." : status === "success" ? "Message Sent Successfully!" : "Send Message"}
                  {status === "idle" || status === "error" ? <Send className="w-5 h-5 ml-2" /> : null}
                  {status === "success" ? <CheckCircle className="w-5 h-5 ml-2" /> : null}
                </Button>

                {status === "error" && (
                  <p className="text-destructive text-sm mt-2 text-center font-medium">
                    Oops! Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
