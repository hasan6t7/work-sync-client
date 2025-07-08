import React from "react";
import Banner from "../../Components/Banner/Banner";
import Services from "../../Components/Services/Services";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Faq from "../../Components/FAQ/Faq";
import CaseStudies from "../../Components/CaseStudies/CaseStudies";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <Testimonials></Testimonials>
      <Faq></Faq>
      <CaseStudies></CaseStudies>
    </div>
  );
};

export default Home;
