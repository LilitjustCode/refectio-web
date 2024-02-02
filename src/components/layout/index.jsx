import "./style.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Instagram, Mail, Telegram } from "../svg";
import { useSelector, useDispatch } from "react-redux";
import { MyProfile } from "../../Redux/action/myProfile_action";

export const Layout = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((st) => st.MyProfile_reducer.user);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (token) {
      dispatch(MyProfile());
    }
  }, [token, dispatch]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  const apps = localStorage.getItem("application_popup");
  console.log(app == null, apps == null, "lll");
  return (
    <div className="mainLayout">
      {windowWidth < 550 && app != null && (
        <div className="reclam">
          <div className="reclamImgDiv">
            <img
              className="reclamImage"
              src={require("../../assets/minilogo.png")}
            />
            <div className="reclamTextDiv">
              <p className="reclamText">
                Refectio: мебель, интерьер, <br /> быстрый поиск
              </p>

              <div className="star_div_reclam">
                <img src={require("../../assets/star.png")} />
                <img src={require("../../assets/star.png")} />
                <img src={require("../../assets/star.png")} />
                <img src={require("../../assets/star.png")} />
                <img src={require("../../assets/star.png")} />
              </div>
              <p className="reclamapp">Приложение</p>
            </div>
          </div>

          <p
            className="reclamView"
            onClick={() => {
              handleButtonClick();
            }}
          >
            Скачать
          </p>
        </div>
      )}
      {windowWidth < 550 ? (
        ""
      ) : (
        <div className="topLayout">
          <div className="topLayoutBlock">
            <img
              alt=""
              src={require("../../assets/refectioLogo.png")}
              onClick={() => (window.location = "/")}
            />
            <p>
              Агрегатор производителей мебели и предметов интерьера <br />
              по индивидуальным размерам.
            </p>
          </div>
        </div>
      )}

      {windowWidth < 550 ? "" : <div className="topLayoutBlockBottom" />}
      {/* */}
      {windowWidth < 550 ? (
        ""
      ) : (
        <div className="middleLayout">
          <div className="middleLayoutBlock">
            <p />
            {token ? (
              <div
                className="layoutUser"
                onClick={() => (window.location = "/profile")}
              >
                <h2>Мой профиль</h2>
                <img
                  alt=""
                  src={`${process.env.REACT_APP_IMAGE}${user?.logo}`}
                />
              </div>
            ) : (
              <span onClick={() => (window.location = "/auth/login")}>
                Вход/Регистрация
              </span>
            )}
          </div>
        </div>
      )}
      {windowWidth < 550 ? "" : <div className="layoutSeparator" />}
      <Outlet />
      {windowWidth < 550 ? "" : <div className="layoutSeparator" />}
      {windowWidth < 550 ? (
        ""
      ) : (
        <div className="bottomLayout">
          <div className="bottomLayoutBlock">
            <div className="socialMedias">
              <div
                onClick={() =>
                  window.open("https://instagram.com/refectio_app", "_blank")
                }
              >
                <Instagram />
              </div>
              <div
                onClick={() => window.open("https://t.me/refectio", "_blank")}
              >
                <Telegram />
              </div>
              <div onClick={() => window.open("mailto:romanov@weta.ru")}>
                <Mail />
              </div>
            </div>
            <span>
              Refectio © 2023. <br />
              Все права защищены.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
