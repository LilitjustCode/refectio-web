import React from "react";

export const CarouselItem = ({
  item,
  index,
  width,
  fullScreen,
  setActiveIndex,
  setFullScreen,
  onClickStar,
  className,
}) => {
  // console.log(item, "mm");
  return (
    <div
      className={!fullScreen ? "carousel-item" : "blured-item"}
      style={!fullScreen ? { width: width } : { display: "none" }}
    >
      <div
        style={{
          background: `url(https://admin.refectio.ru/storage/app/uploads/${item.image
            .replace("(", "%28")
            .replace(")", "%29")}`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className={fullScreen ? "carousel-img-full" : "carousel-img"}
        onClick={() => {
          setActiveIndex(index);
          setFullScreen((prev) => !prev);
        }}
      >
        {!fullScreen && (
          <div
            className={`star-box ${className}`}
            onClick={(e) => {
              console.log(item.id, "id. slide");
              e.stopPropagation();
              onClickStar(item);
            }}
          >
            <img
              src={require(item.star == 1
                ? "../../assets/filled_star.png"
                : "../../assets/unfilled_star.png")}
              className="star"
              alt="favorite star"
            />
          </div>
        )}
      </div>
    </div>
  );
};
