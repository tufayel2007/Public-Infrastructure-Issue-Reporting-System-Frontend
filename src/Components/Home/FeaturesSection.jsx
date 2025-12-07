import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Report Issues",
      description:
        "Easily report infrastructure issues such as broken streetlights, potholes, or water leakage with photos and descriptions.",
    },
    {
      title: "Track Your Reports",
      description:
        "Track the status of your reports from submission to resolution with real-time updates.",
    },
    {
      title: "Upvote Important Issues",
      description:
        "Show the public importance of issues by upvoting. Boost issues to increase their priority.",
    },
    {
      title: "Admin and Staff Management",
      description:
        "Admins can manage staff, assign tasks, and resolve issues efficiently, ensuring timely resolution of reports.",
    },
  ];

  return (
    <div className="bg-gray-100 py-16 px-4 md:px-12">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-xl hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-base text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
