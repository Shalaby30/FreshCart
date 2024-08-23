import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";

import img1 from "../../assets/grocery-banner-2.jpeg";
import img2 from "../../assets/grocery-banner.png";
import slider1 from "../../assets/slider-image-1.jpeg";
import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-3.jpeg";
import Slider from "react-slick";
export default function Mainslider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="row">
          <div className="w2/3">
            <Slider {...settings} className="px-5">
              <img
                src={slider1}
                alt="Slider Image 1"
                className="w-full h-auto"
              />
              <img
                src={slider2}
                alt="Slider Image 2"
                className="w-full h-auto"
              />
              <img
                src={slider3}
                alt="Slider Image 3"
                className="w-full h-auto"
              />
            </Slider>
          </div>
          <div className="w1/3">
            <img src={img1} className="h-[200px]" alt="" />
            <img src={img2} className="h-[200px]" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
