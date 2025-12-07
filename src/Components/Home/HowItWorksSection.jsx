import React from "react";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Submit an Issue",
      description:
        "Citizens can report infrastructure issues by providing a title, description, images, and location.",
      icon: "📷",
    },
    {
      title: "Admin Review",
      description:
        "Admin reviews the submitted issue and assigns it to an available staff member for further action.",
      icon: "📝",
    },
    {
      title: "Staff Action",
      description:
        "The assigned staff verifies the issue, updates its status, and starts working on resolving it.",
      icon: "🔧",
    },
    {
      title: "Issue Resolution",
      description:
        "Once the issue is resolved, it is marked as closed, and the citizen receives a notification with updates.",
      icon: "✔️",
    },
  ];

  return (
    <div className="bg-blue-50 py-16 px-4 md:px-12">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-blue-600 mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-xl hover:scale-105"
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
            <p className="text-base text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
