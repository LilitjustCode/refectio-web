import React from "react";
import "./styles/sliderBackground.css";

function CarouselItemBackground({
  item,
  index,
  width,
  fullScreen,
  setActiveIndex,
  setFullScreen,
}) {
  return (
    <div className="item-full-container">
      <div
        className="carousel-background-box"
        style={{
          width: "65vw",
          background: `url(https://admin.refectio.ru/storage/app/uploads/${item.image})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}

export default CarouselItemBackground;
