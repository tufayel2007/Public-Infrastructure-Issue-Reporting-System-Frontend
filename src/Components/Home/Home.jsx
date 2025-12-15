import React from "react";
import Banner from "./Banner";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import StatsSection from "./StatsSection";
import Testimonials from "./Testimonials";
import FQUAns from "./FQUAns";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturesSection></FeaturesSection>
      <HowItWorksSection></HowItWorksSection>

      <StatsSection />
      <Testimonials />
      <FQUAns />
    </div>
  );
};

export default Home;
