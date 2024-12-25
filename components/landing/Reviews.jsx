/** @format */
"use client";

import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import andrew from "../../assets/avatar/andrew.jpg";
import jessica from "../../assets/avatar/jessica.jpg";
import karolina from "../../assets/avatar/karolina.jpg";
import olly from "../../assets/avatar/olly.jpg";

export default function Reviews() {
  const words = [
    {
      text: "Apa",
    },
    {
      text: "Kata",
    },
    {
      text: "Mereka",
    },
    {
      text: "tentang",
    },
    {
      text: "Lost",
      className: "text-teal-700 dark:text-teal-700",
    },
    {
      text: "&",
      className: "text-teal-700 dark:text-teal-700",
    },
    {
      text: "Found ?",
      className: "text-teal-700 dark:text-teal-700",
    },
  ];
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Andrew Chen",
      designation: "@AndrewwChenn",
      src: andrew,
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Jessica Rodriguez",
      designation: "@jessiRodgz",
      src: jessica,
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Karolina Watson",
      designation: "@whatsKarolina",
      src: karolina,
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Olly",
      designation: "@Ollyzhrin",
      src: olly,
    },
  ];
  return (
    <section className='py-20 bg-white' id='reviews'>
      <div className='container'>
        <div className='flex justify-center'>
          <div className='text-sm border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight'>
            Testimonials
          </div>
        </div>
        <div className='text-center text-lg mt-6'>
          Cerita Nyata dari Mereka yang Telah Terbantu
        </div>
        <div className='flex justify-center '>
          <TypewriterEffectSmooth words={words} />
        </div>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
}
