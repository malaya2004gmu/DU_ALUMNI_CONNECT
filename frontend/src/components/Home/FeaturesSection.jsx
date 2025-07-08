import React from "react";
import {link} from "react-router-dom";
import FeatureCard  from "./FeatureCard";

const FeatureSection=()=>{
    const features = [
    {
      title: "Connect with Alumni",
      description:
        "Engage and interact with alumni to build your professional network.",
    },
    {
      title: "Job Opportunities",
      description:
        "Find job postings from trusted alumni working across the industry.",
    },
    {
      title: "Events & Webinars",
      description: "Stay updated on alumni events, reunions, and workshops.",
    },
  ];
    return (
    <section className="py-10 px-6 sm:px-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Join DUAlumniConnect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow ">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>
    );
};
export default FeatureSection;