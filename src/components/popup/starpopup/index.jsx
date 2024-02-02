import "./style.css";
import { useEffect } from "react";
import { CloseIcon } from "../../svg";

export const StarPopup = ({ open, setOpen, product, second, first }) => {
  const scrollPosition = window.scrollY || window.pageYOffset;

  useEffect(() => {
    document.querySelector(".mainLayout").style.position = "fixed";
    document.querySelector(".mainLayout").style.top = -scrollPosition;
  }, []);

  function close() {
    document.querySelector(".mainLayout").style.position = "relative";
    window.scrollTo(0, scrollPosition);
    setOpen(false);
  }

  return (
    <div className={open ? "activePopup" : "inactive"}>
      <div className="pop_more_star">
        <div className="close" onClick={close}>
          <CloseIcon />
        </div>
        {/* <div
          className="moreInfoPopup"
          dangerouslySetInnerHTML={{ __html: product?.about }}
        /> */}
        {second && (
          <div className="star_pop_div">
            <p>
              Всего можно выбрать не более 5-ти фото со ⭐️ по каждой категории.
            </p>
          </div>
        )}

        {first && (
          <>
            <div className="star_pop_first">
              <h2>Сведение</h2>
              <p>
                Фотографии со ⭐️ будут отображаться на главной странице.
                <br />
                <br />
                Всего можно выбрать не более 5-ти фото со ⭐️ по каждой
                категории.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
