import React from "react";
import Navigation from "../ComponentFinal/Navigation";
import Footer from "../ComponentFinal/Footer";
import Hero from "../ComponentFinal/Hero";

const LayoutLanding = (props) => {
  console.log(props);
  return (
    <>
      <Navigation />

      <div className="container mx-auto">{props.children}</div>
      <Footer />
    </>
  );
};

export default LayoutLanding;
