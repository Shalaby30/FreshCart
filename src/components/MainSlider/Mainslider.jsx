import React from "react";
import Slider from "react-slick";

import img1 from "../../assets/grocery-banner-2.jpeg";
import img2 from "../../assets/grocery-banner.png";
import slider1 from "../../assets/slider-image-1.jpeg";
import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-3.jpeg";

export default function Mainslider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, 
    autoplay: true,
  };

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-2/3">
            <Slider {...settings} className="">
              <img
                src={slider1}
                alt="Slider Image 1"
                className="h-[400px] w-full object-cover"
              />
              <img
                src={slider2}
                alt="Slider Image 2"
                className="h-[400px] w-full object-cover"
              />
              <img
                src={slider3}
                alt="Slider Image 3"
                className="h-[400px] w-full object-cover"
              />
            </Slider>
          </div>
          <div className="w-1/3 flex flex-col">
            <img src={img1} className="h-[200px] w-full object-cover" alt="Banner Image 1" />
            <img src={img2} className="h-[200px] w-full object-cover" alt="Banner Image 2" />
          </div>
        </div>
      </div>
    </section>
  );
}
