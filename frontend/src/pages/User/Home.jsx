import React from "react";
import Slider from "../../components/Home/Slider";
import Footer from "../../components/Footer";
import HeroSection from "../../components/Home/HeroSection";
import FeatureSection from "../../components/Home/FeaturesSection";
import UpcomingEvents from "../../components/Home/UpcomingEvents";
import Testimonial from "../../components/Home/Testimonial";
import FinalCall from "../../components/Home/FinalCall";
const Home = () => {
  return (
    <>
      <div className="bg-white text-gray-800 min-h-screen">
        <Slider />

        <HeroSection />

        <FeatureSection />

        <UpcomingEvents />

        <Testimonial />

        <FinalCall />
      </div>
      <Footer />
    </>
  );
};

export default Home;
