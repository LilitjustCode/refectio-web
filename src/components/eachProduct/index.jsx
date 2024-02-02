import "./style.css";
import { useState } from "react";
import { MoreInfo } from "../popup/moreInfo";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

export const EachProduct = ({
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

      {product?.product_image?.length !== 1 ? (
        <Carousel
          style={styles}
          showThumbs={false}
          showStatus={false}
          onClickItem={onClick}
          showIndicators={product?.product_image?.length !== 1}
        >
          {product?.product_image?.length > 0 &&
            product?.product_image?.map((e, i) => (
              // <div>
              //   {star && (
              //     <div

              //     className="starBlock" onClick={() => onClickStar(e)}>
              //       {e.star == "0" ? (
              //         <img
              //           onClick={() => {
              //             onClickStar(e);
              //           }}
              //           style={{ right: "20px" }}
              //           className="starBlock"
              //           src={require("../../assets/unfilled_star.png")}
              //         />
              //       ) : (
              //         <img
              //           onClick={() => {
              //             onClickStar(e);
              //           }}
              //           style={{ right: "20px" }}
              //           className="starBlock"
              //           src={require("../../assets/filled_star.png")}
              //         />
              //       )}
              //     </div>
              //   )}

              <img
                alt=""
                key={i}
                src={`${process.env.REACT_APP_IMAGE}${e.image}`}
                className="carouselImages"
              />
              // </div>
            ))}
        </Carousel>
      ) : (
        <div>
          {product?.product_image?.map((e, i) => (
            <img
              alt=""
              key={i}
              src={`${process.env.REACT_APP_IMAGE}${e.image}`}
              className="carouselImagesOne"
              onClick={dontWork ? onClick : ""}
            />
          ))}
        </div>
      )}

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
                {product?.length.replace(".", ",")}
              </span>{" "}
              м.
            </span>
          )}
          {product?.height && (
            <span>
              Высота:{" "}
              <span style={{ fontFamily: "sans-serif" }}>
                {product?.height.replace(".", ",")}
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
