import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="w-full mt-24 md:mt-28">
      <Image
        src="/assets/heroSection.webp"
        alt="Madhoor Pureline"
        width={1536}
        height={1024}
        priority
        className="w-full h-auto"
      />
    </section>
  );
}
