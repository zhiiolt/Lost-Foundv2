/** @format */
import Image from "next/image";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProductShowcase from "../components/landing/ProductShowcase";
import Reviews from "../components/landing/Reviews";
import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost & Found",
  description: "Generated by create next app",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductShowcase />
      <Features />
      <Reviews />
      <Footer />
    </>
  );
}
