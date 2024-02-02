import "./style.css";
import { useState, useEffect } from "react";
import { EachProduct } from "../eachProduct";
import { SingleProduct } from "../popup/singleProduct";

export const EachManufacturer = ({ manufacturer }) => {
  const [openSingleProductPopup, setOpenSingleProductPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // console.log(manufacturer, "manufacturer");
  let companyName = "";
  manufacturer?.company_name?.split(" ").forEach((element) => {
    companyName += element;
  });

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (manufacturer) {
      const userCategories = manufacturer?.parent_category?.filter(
        (e) => e.parent_category_name
      );
      userCategories?.length && setCategories(userCategories);
    }
  }, [manufacturer]);

  function handleClick(e) {
    setSelectedProduct(e);
    setOpenSingleProductPopup(true);
    console.log("click");
  }

  return (
    <>
      {openSingleProductPopup && (
        <SingleProduct
          open={openSingleProductPopup}
          setOpen={setOpenSingleProductPopup}
          product={selectedProduct}
        />
      )}

      <div className="eachManufacturer">
        <div className="eachManuTop">
          <img
            alt=""
            src={`${process.env.REACT_APP_IMAGE}${manufacturer.logo}`}
            onClick={() =>
              (window.location = `/${companyName}/${manufacturer?.id}`)
            }
          />
          <div className="eachManuTopTitle">
            <h2
              onClick={() =>
                (window.location = `/${companyName}/${manufacturer?.id}`)
              }
            >
              {manufacturer?.company_name}
            </h2>
            <span>{manufacturer?.made_in}</span>
          </div>
        </div>

        {categories?.length > 0 && (
          <div className="eachManuCats">
            {categories?.map((e, i) => (
              <div className="eachManuCategory" key={i}>
                {e.parent_category_name && (
                  <span>{e?.parent_category_name}</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="eachManuProds">
          {manufacturer?.user_product_limit1?.length > 0 &&
            manufacturer?.user_product_limit1?.map((e, i) => {
              return (
                <EachProduct
                  onClick={() => handleClick(e)}
                  product={e}
                  key={i}
                  width={"345px"}
                  height={"220px"}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
