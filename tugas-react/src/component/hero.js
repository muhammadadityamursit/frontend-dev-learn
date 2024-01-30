import React, { useState } from "react";

const Hero = () => {
  const [display, setDisplay] = useState(true);

  const onClose = () => {
    setDisplay(display === true ? false : true);
  };

  return (
    <div className="hero">
      {display && (
        <>
          <img src="img/photo.png" alt="photo" srcSet="" />
          <p>
            <code>Posted by : Aditya, 28 Feb 2023</code>
          </p>
        </>
      )}
      <button onClick={onClose}>Sembunyikan pembuat artikel</button>
    </div>
  );
};

export default Hero;
