"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type WhyusTypes = {
  quote: string;
  name: string;
};

export const WhyUsComp = ({
  whyus,
  autoplay = false,
}: {
  whyus: WhyusTypes[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => {
      const next = prev + 1;
      return next >= whyus.length ? 0 : next;
    });
  };

  const handlePrev = () => {
    setActive((prev) => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? whyus.length - 1 : prevIndex;
    });
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 3000); // auto change every 3 sec
      return () => clearInterval(interval);
    }
  }, [autoplay, whyus.length]);

  const current = whyus[active] ?? whyus[0];
  if (!current) return null;

  return (
    <div className="mx-auto max-w-xl px-4 py-20 font-sans antialiased md:max-w-3xl md:px-8 lg:px-12">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          key={active}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-center"
        >
          <h3 className="text-5xl font-bold text-[#f57c3b] dark:text-white">
            {current.name}
          </h3>
          <motion.p className="mt-8 text-2xl text-gray-600 dark:text-neutral-300">
            {current.quote.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.02 * index,
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex gap-4 pt-12">
          <button
            onClick={handlePrev}
            className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          >
            <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
          </button>
          <button
            onClick={handleNext}
            className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          >
            <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </div>
  );
};