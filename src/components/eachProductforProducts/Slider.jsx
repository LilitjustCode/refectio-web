import "./styles/slider.css";

import React, { useState, useEffect } from "react";
import CarouselItemBackground from "./CarouselItemBackground";
import { CarouselItem } from "./SliderItem";
import ArrowLeft from "./customComponents/ArrowLeft";
import ArrowRight from "./customComponents/ArrowRight";
import CloseIcon from "./customComponents/CloseIcon";
import Dot from "./customComponents/Dot";
import DotInactive from "./customComponents/DotInactive";
export const Slider = ({ item, onClick, onClickStar }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const scrollPosition = window.scrollY || window.pageYOffset;
  const items = [
    {
      icon: "https://admin.refectio.ru/storage/app/uploads/1682852952photo.jpg",
    },
    {
      icon: "https://admin.refectio.ru/storage/app/uploads/1682852955photo.jpg",
    },
    {
      icon: "https://admin.refectio.ru/storage/app/uploads/1682853048photo.jpg",
    },
  ];

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= item?.product_image?.length) {
      newIndex = item?.product_image?.length - 1;
    }

    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    setActiveIndex(
      (prevSlide) => (prevSlide + 1) % item?.product_image?.length
    );
  };
  const handlePrev = () => {
    setActiveIndex((prevSlide) =>
      prevSlide === 0 ? item?.product_image?.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    if (fullScreen) {
      document.querySelector(".mainLayout").style.position = "fixed";
      document.querySelector(".mainLayout").style.top = -scrollPosition;
    } else {
      document.querySelector(".mainLayout").style.top = -scrollPosition;
      document.querySelector(".mainLayout").style.position = "relative";
    }
  }, [fullScreen]);

  const handleCloseSlider = () => {
    setFullScreen(false);

    document.querySelector(".mainLayout").style.position = "relative";
    document.querySelector(".mainLayout").style.top = scrollPosition;
    window.scrollTo(0, scrollPosition);
    console.log(scrollPosition, "scroll");
  };
  const onHandleClick = (item) => {
    onClickStar(item);
  };
  return (
    <div
      className={fullScreen ? "slider-container" : ""}
      style={
        fullScreen ? { padding: "2% 0%", position: "fixed", zIndex: 9999 } : {}
      }
    >
      {fullScreen && (
        <div className={"carousel-full"}>
          <div
            className="inner-full"
            style={{ transform: `translate(-${activeIndex * 65}vw)` }}
          >
            {fullScreen &&
              item?.product_image?.length > 0 &&
              item?.product_image?.map((e, index) => {
                return (
                  <CarouselItemBackground
                    key={index}
                    item={e}
                    width={"100%"}
                    index={index}
                    fullScreen={fullScreen}
                    setActiveIndex={setActiveIndex}
                    setFullScreen={setFullScreen}
                  />
                );
              })}
          </div>
          {fullScreen && (
            <div className={"carousel-buttons-full"}>
              <button
                className="button-arrow-left"
                onClick={() => {
                  handlePrev();
                }}
              >
                <ArrowLeft />
              </button>

              <button
                className="button-arrow-right"
                onClick={() => {
                  handleNext();
                }}
              >
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
      )}
      <div
        style={fullScreen ? { width: "100%", height: "100%" } : {}}
        className={!fullScreen ? "carousels" : "carousel-blured-full"}
      >
        {fullScreen && <CloseIcon onClick={handleCloseSlider} />}
        <div
          className={fullScreen ? "inner-full" : "inner"}
          style={{
            transform: `translate(-${activeIndex * 100}${
              fullScreen ? "vw" : "%"
            })`,
          }}
        >
          {!fullScreen &&
            item?.product_image?.length > 0 &&
            item?.product_image?.map((el, index) => {
              return (
                <CarouselItem
                  key={index}
                  onClick={onClick}
                  item={el}
                  width={"100%"}
                  index={index}
                  fullScreen={fullScreen}
                  setActiveIndex={setActiveIndex}
                  setFullScreen={setFullScreen}
                  onClickStar={onClickStar}
                />
              );
            })}
        </div>

        {!fullScreen && (
          <>
            <div className={"carousel-buttons"}>
              <button
                className="button-arrow-left"
                onClick={() => {
                  handlePrev();
                }}
              >
                <ArrowLeft />
              </button>

              <button
                className="button-arrow-right"
                onClick={() => {
                  handleNext();
                }}
              >
                <ArrowRight />
              </button>
            </div>
            {!fullScreen && (
              <div className={"indicators"}>
                {item?.product_image?.length > 0 &&
                  item?.product_image?.map((e, index) => {
                    return (
                      <button
                        className="indicator-buttons"
                        onClick={() => {
                          updateIndex(index);
                        }}
                      >
                        {index === activeIndex ? <Dot /> : <DotInactive />}
                      </button>
                    );
                  })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
