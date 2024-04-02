import "./style.css";
import { CloseIcon } from "../../svg";
import { useState, useEffect } from "react";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearPhoneError,
  PhoneCode,
  UpdateWhatsApp,
} from "../../../Redux/action/myProfile_action";

export const EditWhatsApp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const wpupdate = useSelector((st) => st.MyProfile_reducer.wpupdate);
  const phoneError = useSelector((st) => st.MyProfile_reducer.phoneError);
  const codeError = useSelector((st) => st.MyProfile_reducer.codeError);
  const update = useSelector((st) => st.MyProfile_reducer.update);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [openCodePage, setOpenCodePage] = useState(false);
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState(0);
  const scrollPosition = window.scrollY || window.pageYOffset;

  useEffect(() => {
    document.querySelector(".mainLayout").style.position = "fixed";
    document.querySelector(".mainLayout").style.top = -scrollPosition;
  }, []);

  //   useEffect(() => {
  //     if (counter > 0) {
  //       setTimeout(() => setCounter(counter - 1), 1000);
  //       window.scrollTo(0, scrollPosition);
  //     }
  //   }, [counter]);

  useEffect(() => {
    if (wpupdate) {
      setOpen(false);
    }
  }, [wpupdate]);
  console.log(wpupdate, "update");

  useEffect(() => {
    if (phoneError) {
      setError(phoneError);
    } else {
      setError("");
      dispatch(ClearPhoneError());
    }
  }, [phoneError, dispatch]);

  useEffect(() => {
    if (codeError) {
      setError(codeError);
    } else {
      setError("");
    }
  }, [codeError]);

  useEffect(() => {
    if (wpupdate) {
      window.location.reload();
    }
  }, [wpupdate]);

  function close() {
    setOpenCodePage(false);
    setPhoneNumber("");
    setError("");
    setOpen(false);
    document.querySelector(".mainLayout").style.position = "relative";
  }

  function savePhone() {
    if (!phoneNumber || phoneNumber.includes("_")) {
      setError("Обязательное поле");
    } else {
      setError("");
      dispatch(UpdateWhatsApp(phoneNumber));
    }
  }

  return (
    <div className={open ? "activePopup" : "inactive"}>
      <div className="pop">
        <div className="close" onClick={close}>
          <CloseIcon />
        </div>

        <h1 className="passowrdTitle">Введите новый номер WhatsApp</h1>

        <>
          <div className="loginInputs">
            <label>Номер WhatsApp</label>
            <ReactInputMask
              mask="+7 (999) 999-99-99"
              maskChar="_"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={error ? { border: "1px solid red" } : {}}
              onKeyDown={(e) => e.key === "Enter" && savePhone()}
            />
            {error.length > 0 && <span className="loginError">{error}</span>}
          </div>
          <div className="loginButton" style={{ margin: 0 }}>
            <button onClick={savePhone}>Изменить</button>
          </div>
        </>
      </div>
    </div>
  );
};
