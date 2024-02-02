import "./style.css";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageNavigation } from "../../components/pageNavigation";
import { EachManufacturer } from "../../components/eachManufacturer";
import { GetAllManufacturers } from "../../Redux/action/manufacturer_ation";
import { AllManufacturersSkeleton } from "../../components/skeletons/allManufacturers";
import { CloseIcon } from "../../components/svg";

export const AllManufacturers = () => {
  const [popup, setPopup] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const manufacturers = useSelector(
    (st) => st.Manufacturer_reducer.allManufacturers
  );
  const searchManufacturers = useSelector(
    (st) => st.Manufacturer_reducer.search
  );
  const pagination = useSelector((st) => st.Manufacturer_reducer.pagination);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(GetAllManufacturers(currentPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, dispatch]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    if (windowWidth < 550) {
      setPopup(true);
    }
  });

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
  const apps = localStorage.getItem("application");
  return popup && !apps ? (
    <div className="popup_mob">
      <div
        onClick={() => {
          localStorage.setItem("application", "true");
          document.querySelector(".mainLayout").style.position = "relative";
          window.scrollTo(0, 100);
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
          Cмотреть фото и описания. <br /> Есть фильтры и возможность смотреть
          подходящие примеры работ сразу от многих производителей.
        </p>
      </div>
      <div className="popup_mob_btn_div">
        <button onClick={() => handleButtonClick()}>Скачать</button>
      </div>
    </div>
  ) : (
    <div className="allManufacturersPage">
      <PageNavigation
        backButton={false}
        title={"Производители"}
        navigation={false}
        search={true}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {manufacturers?.length ? (
        <div className="allManufacturers">
          {searchText?.length > 0 && searchManufacturers?.length > 0 ? (
            searchManufacturers?.map((e, i) => (
              <EachManufacturer manufacturer={e} key={i} />
            ))
          ) : searchText?.length && !searchManufacturers?.length ? (
            <span className="notFound">Не найдено</span>
          ) : manufacturers?.length > 0 ? (
            manufacturers.map((e, i) => (
              <EachManufacturer manufacturer={e} key={i} />
            ))
          ) : (
            <span className="notFound">Нет производителей</span>
          )}
          {!searchText.length && (
            <div className="pagination">
              <Pagination
                count={pagination?.page_count}
                page={pagination?.current_page}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      ) : (
        <AllManufacturersSkeleton />
      )}
    </div>
  );
};
