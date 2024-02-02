import "./style.css";
import { useState } from "react";
import { MoreInfo } from "../popup/moreInfo";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Slider } from "./Slider";

export const EachProductForProducts = ({
  product,
  onClick,
  width,
  height,
  divWidth,
  minHeight = 140,
  heightInfo,
  star,
  onClickStar,
}) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [dontWork, setDontWork] = useState(true);
  // console.log(product, "product");

  return (
    <div className="eachManuProduct" style={{ width: divWidth }}>
      {openInfo && (
        <MoreInfo open={openInfo} setOpen={setOpenInfo} product={product} />
      )}

      <Slider item={product} onClick={onClick} onClickStar={onClickStar} />

      <div
        className="moreInfo"
        style={heightInfo ? { height: "140px" } : { height: "auto" }}
      >
        <div className="eachManuProdDetails">
          <p>{product?.title ? product?.title : product?.name}</p>
          {product?.facades && <span>Фасады: {product?.facades}</span>}
          {product?.frame && <span>Корпус: {product?.frame}</span>}
          {product?.tabletop && <span>Столешница: {product?.tabletop}</span>}
          {product?.length && (
            <span>
              Длина:{" "}
              <span style={{ fontFamily: "sans-serif" }}>
                {product?.length}
              </span>{" "}
              м.
            </span>
          )}
          {product?.height && (
            <span>
              Высота:{" "}
              <span style={{ fontFamily: "sans-serif" }}>
                {product?.height}
              </span>{" "}
              м.
            </span>
          )}

          {product?.profile && (
            <span>
              Профиль:{" "}
              <span style={{ fontFamily: "sans-serif" }}>
                {product?.profile}
              </span>
            </span>
          )}
          {product?.material && (
            <span>
              Материал:{" "}
              <span style={{ fontFamily: "sans-serif" }}>
                {product?.material}
              </span>
            </span>
          )}
          {product?.price && (
            <span>
              Цена:{" "}
              <span style={{ fontFamily: "sans-serif" }}>
                {product?.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>{" "}
              руб.
            </span>
          )}
        </div>
        {product?.about !== "null" &&
          product?.about != null &&
          product?.about != "undefined" &&
          product?.about != "<p><br></p>" && (
            <button onClick={() => setOpenInfo(true)}>Подробнее</button>
          )}
      </div>
    </div>
  );
};
