"use client";
import { useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import CreatorsSection from "./components/CreatorsSection";

export default function Home() {
  return (
    <LoadingScreen>
      <main className="min-h-screen">
        {/* Hero Section */}
        <div id="home">
          <Hero />
        </div>
        
        {/* Products Section */}
        <div id="products">
          <Products />
        </div>
        
        {/* About Section */}
        <div id="about">
          <About />
        </div>
        
        {/* Contact Section (linked to CreatorsSection) */}
        <div id="contact">
          <CreatorsSection />
        </div>
      </main>
    </LoadingScreen>
  );
}