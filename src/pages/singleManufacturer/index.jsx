import "./style.css";
import { Tooltip } from "@mui/material";
import { CloseIcon } from "../../components/svg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EachProduct } from "../../components/eachProduct";
import { PageNavigation } from "../../components/pageNavigation";
import { SingleProduct } from "../../components/popup/singleProduct";
import { ManufacturerDescription } from "../../components/popup/manufacturerDescription";
import { SingleManufacturerSkeleton } from "../../components/skeletons/singleManufacturer";
import { isAndroid, isIOS } from "react-device-detect";
import { useAppLocation } from "react-app-location";

import {
  FilterCategories,
  GetSingleManufacturer,
} from "../../Redux/action/manufacturer_ation";
import {
  CheckboxChecked,
  CheckboxNotChecked,
  CubicIcon,
  DocumentIcon,
  InfoIcon,
  InternetIcon,
  RemoveIcon,
  ReviewIcon,
  TelegramIcon,
  VerificationIcon,
  WhatsappIcon,
} from "../../components/svg";

export const SingleManufacturer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const manufacturer = useSelector(
    (st) => st.Manufacturer_reducer.singleManufacturerUser
  );
  const categories = useSelector(
    (st) => st.Manufacturer_reducer.singleManufacturerCategories
  );
  const cities = useSelector(
    (st) => st.Manufacturer_reducer.singleManufacturerCities
  );
  const products = useSelector(
    (st) => st.Manufacturer_reducer.singleManufacturerProducts
  );
  const filteredProducts = useSelector(
    (st) => st.Manufacturer_reducer.singleManufacturerFilteredProducts
  );
  const [openSingleProductPopup, setOpenSingleProductPopup] = useState(false);
  const [companyName] = useState(window.location.pathname.split("/")[1]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checked, setChecked] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [myCategories, setMyCategories] = useState([]);
  const [productsToShow, setProductsToShow] = useState(products);
  const [popup, setPopup] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  useEffect(() => {
    dispatch(GetSingleManufacturer(companyName));
  }, [companyName, dispatch]);

  useEffect(() => {
    if (manufacturer) {
      // console.log(manufacturer?.id, "idddddddd");
      if (
        manufacturer?.show_room?.includes("Да") ||
        manufacturer?.show_room?.includes("да")
      ) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  }, [manufacturer]);

  useEffect(() => {
    if (categories) {
      let category = [];
      categories
        ?.filter((e) => e.parent_category_name)
        ?.forEach((element) => {
          category.push({
            selected: false,
            name: element.parent_category_name,
            id: element.parent_category_id,
          });
        });
      setMyCategories(category);
    }
  }, [categories]);

  useEffect(() => {
    if (myCategories?.every((e) => e.selected === false)) {
      setProductsToShow(products);
    } else {
      myCategories?.forEach((element) => {
        element?.selected &&
          dispatch(FilterCategories(element?.name, manufacturer?.id));
      });
      setProductsToShow(filteredProducts);
    }
  }, [myCategories, filteredProducts, products, manufacturer, dispatch]);

  const toggleCategorySelection = (categoryId) => {
    setMyCategories((prevCategories) =>
      prevCategories?.map((category) => ({
        ...category,
        selected: category?.id === categoryId ? !category?.selected : false,
      }))
    );
  };

  function handleClick(e) {
    setSelectedProduct(e);
    setOpenSingleProductPopup(true);
  }

  function handleProtocol(url) {
    const protocolRegex = /^https?:\/\//i;
    if (protocolRegex.test(url)) {
      return url;
    } else {
      return "http://" + url;
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowWidth(window.innerWidth);
  //   }

  //   window.addEventListener("resize", handleResize);

  //   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  //   const openAppOrAppStore = () => {
  //     const appSchemeUrl = `mychat://id/${manufacturer?.id}`;
  //     const appStoreUrl = "https://apps.apple.com/us/app/your-app-id"; // Replace with your App Store URL

  //     if (
  //       /iPad|iPhone/.test(navigator.platform) &&
  //       manufacturer.id &&
  //       !isOpen
  //     ) {
  //       window.location = `mychat://id/${manufacturer?.id}`;
  //       setTimeout(function () {
  //         setIsOpen(true);
  //       }, 0);
  //     } else {
  //       // window.location = `mychat://id/${manufacturer?.id}`;
  //     }
  //   };
  //   openAppOrAppStore();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [manufacturer.id]);

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowWidth(window.innerWidth);
  //   }

  //   window.addEventListener("resize", handleResize);

  //   const isAndroid = /Android/i.test(navigator.userAgent);
  //   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  //   if (windowWidth < 550) {
  //     setPopup(true);

  //     if (isAndroid && manufacturer.id) {
  //       const appSchemeUrl = `mychat://id/${manufacturer.id}`;
  //       window.location.href = appSchemeUrl;
  //     } else if (isIOS && navigator.standalone) {
  //       // If the app is installed and running in standalone mode, stay on the current page
  //       window.location.href = `mychat://id/${manufacturer.id}`;
  //     } else {
  //       // If the app is not installed or not in standalone mode, attempt to open the app
  //       const appSchemeUrl = `mychat://id/${manufacturer.id}`;
  //       const newWindow = window.open(appSchemeUrl, "_blank");

  //       // If opening the app fails (e.g., not installed), redirect to the App Store
  //       if (
  //         !newWindow ||
  //         newWindow.closed ||
  //         typeof newWindow.closed === "undefined"
  //       ) {
  //         console.log("eree");
  //       }
  //     }
  //   }

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [manufacturer.id, windowWidth]);

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowWidth(window.innerWidth);
  //   }
  //   let elseBlockExecuted = false;
  //   window.addEventListener("resize", handleResize);
  //   const isAndroid = /Android/i.test(navigator.userAgent);
  //   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  //   // const windowWidth = window.innerWidth;

  //   const isValidUrl = (url) => {
  //     // Implement your logic to validate the URL here
  //     // For example, check if the URL follows a specific pattern or structure
  //     const urlPattern = /^mychat:\/\/id\/\d+$/; // Example pattern
  //     return urlPattern.test(url);
  //   };

  //   if (windowWidth < 550) {
  //     setPopup(true);

  //     if (isAndroid && manufacturer.id) {
  //       const appSchemeUrl = `mychat://id/${manufacturer.id}`;
  //       window.location.href = appSchemeUrl;
  //       setPopup(true);
  //       console.log("android");
  //     } else if (isIOS && manufacturer.id) {
  //       const appSchemeUrl = `mychat://id/${manufacturer.id}`;
  //       if (isValidUrl(appSchemeUrl)) {
  //         window.location.href = appSchemeUrl;
  //         setPopup(true);
  //         elseBlockExecuted = true;
  //       } else {
  //         console.warn("Invalid URL, navigation not allowed");
  //         // Handle the case where the URL is not valid
  //       }
  //     }
  //   }

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [manufacturer.id]);

  const handleButtonClick = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const appPackageName = "com.JustCode.RefectioApp"; // Android

    if (isIOS) {
      console.log("iOS Device detected. Redirecting to App Store...");
      window.location.href = "https://apps.apple.com/app/id6475083266"; // Update this URL with the correct App Store link
    } else if (isAndroid) {
      console.log("Android Device detected. Redirecting to Play Store...");
      window.location.href = `market://details?id=${appPackageName}`;
    } else {
      console.log("Device not recognized as iOS or Android.");
      // You might want to add a fallback behavior here for other devices/platforms.
    }
  };

  const app = localStorage.getItem("application");
  // console.log(app, "appp");

  const isAndroid = () => {
    return /Android/i.test(navigator.userAgent);
  };

  // console.log(whatsappOpen, "open");
  return (
    <>
      {openSingleProductPopup && (
        <SingleProduct
          open={openSingleProductPopup}
          setOpen={setOpenSingleProductPopup}
          product={selectedProduct}
        />
      )}
      {openDescription && (
        <ManufacturerDescription
          open={openDescription}
          setOpen={setOpenDescsetWhatsappOpepopription}
          description={manufacturer?.about_us}
        />
      )}
      {whatsappOpen && (
        <ManufacturerDescription
          open={whatsappOpen}
          setOpen={setWhatsappOpen}
          description={""}
          whatsapp={
            "Данный функционал доступен только в приложении зарегистрированым пользователям ."
          }
        />
      )}
      {popup && !app ? (
        <div className="popup_mob">
          <div
            onClick={() => {
              localStorage.setItem("application", "true");
              setPopup(false);
            }}
            className="popup_mob_close_icon"
          >
            <CloseIcon />
          </div>
          <img src={require("../../assets/mobilepopup.png")} />
          <div className="popup_mob_txt">
            <h2> В приложении удобнее</h2>
            <p>
              Cмотреть фото и описания. <br /> Есть фильтры и возможность
              смотреть подходящие примеры работ сразу от многих производителей.
            </p>
          </div>
          <div className="popup_mob_btn_div">
            <button onClick={() => handleButtonClick()}>Скачать</button>
          </div>
        </div>
      ) : (
        <div className="singleManuPage">
          <PageNavigation
            backButton={true}
            onClick={() => (window.location = "/")}
            title={"Все производители"}
            search={false}
            searchText={""}
            setSearchText={""}
          />

          {windowWidth < 550 && (
            <div className="prevNav" onClick={() => (window.location = "/")}>
              <svg
                width={25}
                height={30}
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.168 27.708a1.458 1.458 0 01-1.137-.54l-7.044-8.75a1.458 1.458 0 010-1.851l7.292-8.75a1.46 1.46 0 112.245 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.138 2.391z"
                  fill="#94D8F4"
                />
              </svg>
              <p>Назад</p>
            </div>
          )}

          {Object.keys(manufacturer) ? (
            <>
              <div className="singleManuBlock">
                <div className="singleManuDetails">
                  <div className="singleManuDetailsLeft">
                    <img
                      alt=""
                      className="cursor"
                      src={`${process.env.REACT_APP_IMAGE}${manufacturer?.logo}`}
                      onClick={() =>
                        dispatch(GetSingleManufacturer(companyName))
                      }
                    />
                    <div className="singleManuDetailsLeftRight">
                      <h1>{manufacturer?.company_name}</h1>
                      <span>{manufacturer?.made_in}</span>
                      <div className="singleManuDeailsIcons">
                        {manufacturer?.saite &&
                          manufacturer.saite !== "null" && (
                            <Tooltip title="Перейти на сайт">
                              <div
                                onClick={() =>
                                  window.open(
                                    handleProtocol(manufacturer?.saite),
                                    "_blank"
                                  )
                                }
                                className="cursor"
                              >
                                <InternetIcon />
                              </div>
                            </Tooltip>
                          )}
                        {manufacturer?.telegram &&
                          manufacturer.telegram !== "null" && (
                            <Tooltip title="Перейти на телеграм">
                              <div
                                className="cursor"
                                onClick={() =>
                                  window.open(
                                    `https://t.me/${manufacturer?.telegram}`,
                                    "_blank"
                                  )
                                }
                              >
                                <TelegramIcon />
                              </div>
                            </Tooltip>
                          )}
                        {manufacturer?.extract &&
                          manufacturer.extract !== "null" && (
                            <Tooltip title="Скачать выписку">
                              <div
                                className="cursor"
                                onClick={() =>
                                  window.open(
                                    `${process.env.REACT_APP_IMAGE}${manufacturer?.extract}`,
                                    "_blank"
                                  )
                                }
                              >
                                <DocumentIcon />
                              </div>
                            </Tooltip>
                          )}
                        {(manufacturer?.job_with_designer?.includes("Да") ||
                          manufacturer?.job_with_designer?.includes("да")) && (
                          <Tooltip title="Этот производитель сотрудничает с дизайнерами">
                            <div className="cursor">
                              <VerificationIcon />
                            </div>
                          </Tooltip>
                        )}
                        {(manufacturer?.dmodel?.includes("Да") ||
                          manufacturer?.dmodel?.includes("да")) && (
                          <Tooltip title="Этот производитель предоставляет 3d модели">
                            <div className="cursor">
                              <CubicIcon />
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="singleManuDetailsRight">
                    {windowWidth <= 550 ? (
                      <div className="singleManuDetailsRight_mob">
                        {cities?.length > 0 ? (
                          <div className="singleManuFilter">
                            <select>
                              {cities.length > 0 &&
                                cities?.map((e, i) => (
                                  <option key={i}>{e?.city_name}</option>
                                ))}
                            </select>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="singleManuDetailsRightCheckbox">
                          <span>Шоурум</span>
                          <div>
                            {checked ? (
                              <CheckboxChecked />
                            ) : (
                              <CheckboxNotChecked />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="singleManuDetailsRightCheckbox">
                        <span>Шоурум</span>
                        <div>
                          {checked ? (
                            <CheckboxChecked />
                          ) : (
                            <CheckboxNotChecked />
                          )}
                        </div>
                      </div>
                    )}

                    <div className="singleManuDetailsRightIcons">
                      <div
                        className="eachSingleManuDetailsRightIcon"
                        onClick={() => setOpenDescription(true)}
                      >
                        <InfoIcon />
                        <span>Доп. информация</span>
                      </div>
                      {windowWidth <= 550 ? (
                        <div className="line_mob"></div>
                      ) : (
                        ""
                      )}

                      <div
                        className="eachSingleManuDetailsRightIcon"
                        onClick={() => {
                          console.log("pop");
                          setWhatsappOpen(true);
                        }}
                      >
                        <WhatsappIcon />
                        <span>Написать в Whatsapp</span>
                      </div>
                      {windowWidth <= 550 ? (
                        <div className="line_mob"></div>
                      ) : (
                        ""
                      )}
                      <div className="eachSingleManuDetailsRightIcon">
                        <ReviewIcon />
                        <span>Отзывы</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="manuTopFilter">
                  {myCategories.length > 0 && (
                    <div className="myProductCategories">
                      {myCategories?.map((e, i) => (
                        <button
                          key={i}
                          className="eachProductCategory"
                          style={
                            e?.selected
                              ? {
                                  background: "var(--2-d-9-efb, #2D9EFB)",
                                  color: "#fff",
                                }
                              : {}
                          }
                          onClick={() => toggleCategorySelection(e.id)}
                        >
                          {e?.name}
                        </button>
                      ))}
                    </div>
                  )}
                  {cities?.length > 0 && windowWidth > 550 ? (
                    <div className="singleManuFilter">
                      <select>
                        {cities.length > 0 &&
                          cities?.map((e, i) => (
                            <option key={i}>{e?.city_name}</option>
                          ))}
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* </div> */}
                {/* <div className='singleManuBlock'> */}
                <div className="singleManuProducts">
                  {productsToShow?.length > 0 ? (
                    productsToShow?.map((e, i) => (
                      <EachProduct
                        onClick={() => handleClick(e)}
                        product={e}
                        key={i}
                      />
                    ))
                  ) : (
                    <span>Нет товаров</span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <SingleManufacturerSkeleton />
          )}
        </div>
      )}
    </>
  );
};
