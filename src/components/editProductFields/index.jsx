import { RublIcon } from "../svg";
import RichTextEditor from "../editor";
import { useEffect, useState } from "react";
import "./style.css";

export const EditProductFields = ({
  details,
  setDetails,
  errors,
  setErrors,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  setCategoryHasSubcategory,
  description,
  setDescription,
}) => {
  console.log(details.material);
  function handleCategoryChange(event) {
    setSelectedCategory([]);
    setSelectedSubcategory([]);
    const category = categories.filter(
      (elm) => +elm.id === +event.target.value
    )[0];
    setSelectedCategory(category);
    if (category?.childrens?.length > 0) {
      setCategoryHasSubcategory(true);
    } else {
      setCategoryHasSubcategory(false);
      setErrors({ ...errors, subcategory: "" });
    }
  }
  function handleSubcategoryChange(event) {
    setSelectedSubcategory(
      selectedCategory?.childrens?.filter(
        (elm) => +elm.id === +event.target.value
      )[0]
    );
  }

  const [showFacades, setShowFacades] = useState(false);
  const [showFrame, setShowFrame] = useState(false);
  const [showTabletop, setShowTabletop] = useState(false);
  const [showLength, setShowLength] = useState(false);
  const [showHeight, setShowHeight] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMaterial, setShowMaterial] = useState(false);
  // console.log(selectedSubcategory?.id, selectedCategory?.id, "jhh");
  useEffect(() => {
    // console.log("lll");
    if (selectedSubcategory || selectedCategory) {
      if (
        selectedSubcategory?.id === 28 ||
        selectedSubcategory?.id === 30 ||
        selectedSubcategory?.id === 31 ||
        selectedSubcategory?.id === 36 ||
        selectedSubcategory?.id === 42 ||
        selectedSubcategory?.id === 43 ||
        selectedSubcategory?.id === 45 ||
        selectedSubcategory?.id === 46 ||
        selectedSubcategory?.id === 50 ||
        selectedSubcategory?.id === 51 ||
        selectedSubcategory?.id === 57 ||
        selectedSubcategory?.id === 63 ||
        selectedSubcategory?.id === 65 ||
        selectedSubcategory?.id === 66 ||
        selectedSubcategory?.id === 58 ||
        selectedSubcategory?.parent_id === 4
      ) {
        setShowFacades(true);
      } else {
        setShowFacades(false);
        setDetails({ ...details, facades: "" });
      }

      if (
        selectedSubcategory?.id === 28 ||
        selectedSubcategory?.id === 30 ||
        selectedSubcategory?.id === 31 ||
        selectedSubcategory?.id === 36 ||
        selectedSubcategory?.id === 42 ||
        selectedSubcategory?.id === 43 ||
        selectedSubcategory?.id === 45 ||
        selectedSubcategory?.id === 46 ||
        selectedSubcategory?.id === 50 ||
        selectedSubcategory?.id === 51 ||
        selectedSubcategory?.id === 58 ||
        selectedSubcategory?.id === 63 ||
        selectedSubcategory?.id === 65 ||
        selectedSubcategory?.id === 66 ||
        selectedSubcategory?.id === 94 ||
        selectedSubcategory?.id === 95 ||
        selectedSubcategory?.id === 96 ||
        selectedSubcategory?.id === 97 ||
        selectedSubcategory?.id === 98
      ) {
        setShowFrame(true);
      } else {
        setShowFrame(false);
        setDetails({ ...details, frame: "" });
      }

      if (
        selectedSubcategory?.id === 28 ||
        selectedSubcategory?.id === 30 ||
        selectedSubcategory?.id === 40 ||
        // selectedSubcategory?.id === 42 ||
        selectedSubcategory?.id === 50
      ) {
        setShowFrame(true);
        setShowTabletop(true);
      } else {
        setShowTabletop(false);
        // setShowFrame(false);
        setDetails({ ...details, tabletop: "" });
      }

      if (
        selectedSubcategory?.id === 28 ||
        selectedSubcategory?.id === 30 ||
        selectedSubcategory?.id === 31 ||
        selectedSubcategory?.id === 36 ||
        selectedSubcategory?.id === 42 ||
        selectedSubcategory?.id === 43 ||
        selectedSubcategory?.id === 94 ||
        selectedSubcategory?.id === 45 ||
        selectedSubcategory?.id === 46 ||
        selectedSubcategory?.id === 50 ||
        selectedSubcategory?.id === 51 ||
        selectedSubcategory?.id === 95 ||
        selectedSubcategory?.id === 57 ||
        selectedSubcategory?.id === 58 ||
        selectedSubcategory?.id === 96 ||
        selectedSubcategory?.id === 63 ||
        selectedSubcategory?.id === 97 ||
        selectedSubcategory?.id === 65 ||
        selectedSubcategory?.id === 66 ||
        selectedSubcategory?.id === 98 ||
        selectedSubcategory?.parent_id === 4
      ) {
        setShowLength(true);
      } else {
        setShowLength(false);
        setDetails({ ...details, length: "" });
      }

      if (
        selectedSubcategory?.id === 31 ||
        selectedSubcategory?.id === 36 ||
        selectedSubcategory?.id === 37 ||
        selectedSubcategory?.id === 41 ||
        selectedSubcategory?.id === 43 ||
        selectedSubcategory?.id === 94 ||
        selectedSubcategory?.id === 50 ||
        selectedSubcategory?.id === 51 ||
        selectedSubcategory?.id === 95 ||
        selectedSubcategory?.id === 57 ||
        selectedSubcategory?.id === 58 ||
        selectedSubcategory?.id === 96 ||
        selectedSubcategory?.id === 63 ||
        selectedSubcategory?.id === 66 ||
        selectedSubcategory?.id === 98
      ) {
        setShowHeight(true);
        setShowFrame(true);
      } else {
        // setShowFrame(false)
        setShowHeight(false);
        setDetails({ ...details, height: "" });
      }

      if (
        selectedSubcategory?.id === 37 ||
        // selectedSubcategory.id === 66 ||
        selectedSubcategory?.id === 94 ||
        selectedSubcategory?.id === 95 ||
        selectedSubcategory?.id === 96 ||
        selectedSubcategory?.id === 97 ||
        selectedSubcategory?.id === 98
      ) {
        setShowProfile(true);
        setShowFrame(true);
        setShowHeight(true);
      } else {
        setShowProfile(false);
        setDetails({ ...details, profile: "" });
      }
      if (
        selectedSubcategory?.id === 32 ||
        selectedSubcategory?.id === 33 ||
        selectedSubcategory?.id === 34 ||
        selectedSubcategory?.id === 35 ||
        selectedSubcategory?.id === 44 ||
        selectedSubcategory?.id === 48 ||
        selectedSubcategory?.id === 52 ||
        selectedSubcategory?.id === 53 ||
        selectedSubcategory?.id === 54 ||
        selectedSubcategory?.id === 55 ||
        selectedSubcategory?.id === 56 ||
        selectedSubcategory?.id === 59 ||
        selectedSubcategory?.id === 60 ||
        selectedSubcategory?.id === 61 ||
        selectedSubcategory?.id === 62 ||
        selectedSubcategory?.id === 64 ||
        selectedSubcategory?.id === 80 ||
        selectedSubcategory?.id === 81 ||
        selectedSubcategory?.id === 82 ||
        selectedSubcategory?.id === 83 ||
        selectedSubcategory?.id === 84 ||
        selectedSubcategory?.id === 85 ||
        selectedSubcategory?.id === 86 ||
        selectedSubcategory?.id === 87 ||
        selectedSubcategory?.id === 88 ||
        selectedSubcategory?.id === 89 ||
        selectedSubcategory?.id === 90 ||
        selectedSubcategory?.id === 91 ||
        selectedSubcategory?.id === 92 ||
        selectedSubcategory?.id === 38 ||
        selectedSubcategory?.id === 67 ||
        selectedSubcategory?.id === 68 ||
        selectedSubcategory?.id === 69 ||
        selectedSubcategory?.id === 71 ||
        selectedSubcategory?.id === 72 ||
        selectedSubcategory?.id === 73 ||
        selectedSubcategory?.id === 74 ||
        selectedSubcategory?.id === 39 ||
        selectedSubcategory?.id === 29 ||
        selectedSubcategory?.id === 47 ||
        selectedSubcategory?.id === 48 ||
        selectedSubcategory?.id === 70 ||
        selectedSubcategory?.id === 49 ||
        selectedSubcategory?.id === 75 ||
        selectedSubcategory?.id === 76 ||
        selectedSubcategory?.id === 77 ||
        selectedSubcategory?.id === 78 ||
        selectedSubcategory?.id === 79 ||
        selectedCategory?.id === 10 ||
        selectedCategory?.id == 19 ||
        selectedCategory?.id === 21 ||
        selectedCategory?.id === 25 ||
        selectedCategory?.id === 26 ||
        selectedCategory?.id === 11 ||
        selectedCategory?.id === 12 ||
        selectedCategory?.id === 13 ||
        selectedCategory?.id === 20
      ) {
        // console.log("llkjl");
        setShowMaterial(true);
      } else {
        setShowMaterial(false);
        setDetails({ ...details, material: "" });
      }
    }
  }, [selectedSubcategory]);

  // console.log(showMaterial, "matterial");
  return (
    <div className="myProfileBlockk">
      <div className="addProductEachBlock">
        <div className="eachProfileField">
          <div className="profileFieldName">
            <span>Имя продукции</span>
          </div>
          <input
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Кухня ЛРАЙ 145 МДФ ПВХ Сатин Бежевый/СИСТЕМА "
            style={errors.name ? { border: "1px solid red" } : {}}
            maxLength={42}
          />
        </div>
        {showFrame && (
          <div className="eachProfileField">
            <div className="profileFieldName">
              <span>Корпус</span>
            </div>
            <input
              value={details.frame}
              onChange={(e) =>
                setDetails({ ...details, frame: e.target.value })
              }
              placeholder="Корпус"
            />
          </div>
        )}
        {showLength && (
          <div className="eachProfileField">
            <div className="profileFieldName">
              <span>Длина</span>
            </div>
            <input
              type="number"
              value={details.length}
              onChange={(e) =>
                setDetails({ ...details, length: e.target.value })
              }
              placeholder="3,5 метра"
            />
          </div>
        )}
        {showHeight && (
          <div className="eachProfileField">
            <div className="profileFieldName">
              <span>Высота</span>
            </div>
            <input
              type="number"
              value={details.height}
              onChange={(e) =>
                setDetails({ ...details, height: e.target.value })
              }
              placeholder="1,8 метра"
            />
          </div>
        )}
        <div className="eachProfileField">
          <div className="profileFieldName">
            <span>Доп. информация</span>
          </div>
          <RichTextEditor
            userDetails={description != "undefined" ? description : ""}
            setUserDetails={setDescription}
          />
        </div>
        <div className="eachProfileField">
          <div className="profileFieldName">
            <span>Цена</span>
          </div>
          <div className="addProductPrice">
            <input
              value={details.price}
              type="number"
              onChange={(e) =>
                setDetails({ ...details, price: e.target.value })
              }
              placeholder="Цена"
            />
            <RublIcon />
          </div>
        </div>
      </div>
      <div className="addProductEachBlock">
        {showMaterial && (
          <div className="eachProfileField">
            <div className="profileFieldName">
              <span>Материал</span>
            </div>
            <input
              value={details.material}
              onChange={(e) =>
                setDetails({ ...details, material: e.target.value })
              }
              placeholder="Материал"
              style={errors.material ? { border: "1px solid red" } : {}}
              maxLength={52}
            />
          </div>
        )}

        <div className="eachProfileField">
          <div className="profileFieldName">
            <span>Категория</span>
          </div>
          <select
            value={selectedCategory?.id}
            onChange={handleCategoryChange}
            style={errors.category ? { border: "1px solid red" } : {}}
          >
            <option value=""></option>
            {categories?.map((category) => (
              <option key={category.id} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
        {selectedCategory?.childrens?.length > 0 && (
          <div className="eachProfileField">
            <div className="profileFieldName">
              <span>Подкатегория</span>
            </div>
            <select
              value={selectedSubcategory?.id}
              onChange={handleSubcategoryChange}
              style={errors.subcategory ? { border: "1px solid red" } : {}}
            >
              <option value=""></option>
              {selectedCategory?.childrens?.map((subcategory) => (
                <option key={subcategory?.id} value={subcategory?.id}>
                  {subcategory?.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {showTabletop && (
          <div className="eachProfileField">
            <div className="profileFieldName">
              <span>Столешница</span>
            </div>
            <input
              value={details?.tabletop}
              onChange={(e) =>
                setDetails({ ...details, tabletop: e.target.value })
              }
              placeholder="Столешница"
            />
          </div>
        )}
        {showFacades && (
          <div className="eachProfileField">
            <div className="profileFieldName">
              <span>Фасады</span>
            </div>
            <input
              value={details?.facades}
              onChange={(e) =>
                setDetails({ ...details, facades: e.target.value })
              }
              placeholder="Фасады"
            />
          </div>
        )}
        {showProfile && (
          <div className="eachProfileField">
            <div className="profileFieldName">
              <span>Профиль</span>
            </div>
            <input
              value={details?.profile}
              onChange={(e) =>
                setDetails({ ...details, profile: e.target.value })
              }
              placeholder="Профиль"
            />
          </div>
        )}
      </div>
    </div>
  );
};
