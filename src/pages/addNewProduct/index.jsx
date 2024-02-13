import "./style.css";
import { useEffect, useState } from "react";
import { CloseIconBlue } from "../../components/svg";
import { useDispatch, useSelector } from "react-redux";
import { PageNavigation } from "../../components/pageNavigation";
import { GetCategories } from "../../Redux/action/myProfile_action";
import { NewProductFields } from "../../components/newProductFields";

export const AddNewProduct = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const categories = useSelector((st) => st.MyProfile_reducer.categories);
  const [details, setDetails] = useState({
    name: "",
    frame: "",
    facades: "",
    length: "",
    height: "",
    price: "",
    description: "",
    tabletop: "",
    profile: "",
    material: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    category: "",
    subcategory: "",
    photo: "",
  });
  const [files, setFiles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubcategory, setSelectedSubcategory] = useState();
  const [categoryHasSubcategory, setCategoryHasSubcategory] = useState(false);
  const [description, setDescription] = useState("");

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  useEffect(() => {
    photos && setErrors({ ...errors, photo: "" });
  }, [photos]);

  useEffect(() => {
    console.log(selectedCategory, "selected");
    // if (selectedCategory?.childrens.length > 0) {
    //   console.log(true);
    //   if (!selectedSubcategory.name) {
    //     setDisable(false);
    //   } else {
    //     console.log(1);
    //     setDisable(false);
    //   }
    // }
    if (selectedCategory?.childrens?.length > 0 && !selectedSubcategory.name) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [selectedSubcategory, selectedCategory]);

  function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    setPhotos([...photos, ...ImagesArray]);
    const filesArray = Object.values(e.target.files);
    setFiles([...files, ...filesArray]);
  }

  useEffect(() => {}, []);

  function deleteFile(e) {
    setPhotos(photos.filter((item, index) => index !== e));
    setFiles(files.filter((item, index) => index !== e));
  }

  useEffect(() => {
    if (errors.name || errors.category || errors.subcategory || errors.photo) {
      window.scrollTo({ bottom: 100, behavior: "smooth" });
      setDisable(false);
    }
  }, [errors]);

  function create() {
    console.log(selectedCategory, "dss");
    setDisable(true);
    if (!details.name.length) {
      setDisable(false);
      setErrors({ ...errors, name: " " });
    } else if (!selectedCategory) {
      setDisable(false);
      setErrors({ ...errors, name: "", category: " " });
    } else if (
      selectedCategory.childrens.length > 0 &&
      categoryHasSubcategory &&
      !selectedSubcategory.name
    ) {
      // setDisable(true);
      setErrors({ ...errors, name: "", category: "", subcategory: " " });
    } else if (!files.length) {
      setDisable(true);
      setErrors({
        ...errors,
        name: "",
        category: "",
        subcategory: "",
        photo: "Обязательное поле",
      });
    } else {
      setDisable(true);
      setErrors({
        ...errors,
        name: "",
        category: "",
        subcategory: "",
        photo: "",
      });
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const formdata = new FormData();
      formdata.append("name", details.name);
      formdata.append("frame", details.frame);
      formdata.append("facades", details.facades);
      formdata.append("length", details.length);
      formdata.append("height", details.height);
      formdata.append("price", details.price);
      formdata.append("tabletop", details.tabletop);
      formdata.append("material", details.material);
      formdata.append("profile", details.profile);
      if (description?.description) {
        formdata.append("about", description?.description);
      } else {
        formdata.append("about", description);
      }
      files.forEach((elm) => {
        formdata.append("photo[]", elm);
      });
      formdata.append("parent_category_id", selectedCategory.id);
      formdata.append("parent_category_name", selectedCategory.name);
      if (selectedSubcategory?.name) {
        formdata.append("category_name", selectedSubcategory?.name);
        formdata.append("category_id", selectedSubcategory.id);
      }
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch(
        `${process.env.REACT_APP_HOSTNAME}/createnewproductProizvoditel`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setDisable(true);
          console.log(
            result.status && selectedSubcategory?.name,
            selectedSubcategory.name,
            "result"
          );
          if (result.status) {
            setDisable(true);
            window.location = "/my-products";
          } else if (
            result.data.message ===
            "you already have 3 products under this category"
          ) {
            setDisable(false);
            setErrors({
              ...errors,
              category: "Превышен лимит добавления товаров в данной категории",
            });
          }
        })
        .catch((error) => console.log("error", error));
    }
  }

  return (
    <div className="newProductPage">
      <PageNavigation
        backButton={true}
        onClick={() => (window.location = "/my-products")}
        title={"Добавление продукции"}
        navigation={false}
        search={false}
        searchText={""}
        setSearchText={""}
      />
      <div className="newProductBlock">
        <NewProductFields
          disable={disable}
          setDisable={setDisable}
          details={details}
          setDetails={setDetails}
          errors={errors}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          setCategoryHasSubcategory={setCategoryHasSubcategory}
          description={description}
          setDescription={setDescription}
        />
        <div className="newProductPhotoBlock">
          <label>Фотографии продукта*</label>
          <button>
            Загрузить
            <input
              type="file"
              id="fileInput"
              onChange={uploadSingleFile}
              multiple
            />
          </button>
          <div className="newProductPhotos">
            {photos.length > 0 &&
              photos.map((e, i) => (
                <div className="eachProductPhoto" key={i}>
                  <img alt="" src={e} />
                  <div className="deletePhoto" onClick={() => deleteFile(i)}>
                    <CloseIconBlue />
                  </div>
                </div>
              ))}
            {errors.photo && (
              <span style={{ color: "red" }}>{errors.photo}</span>
            )}
          </div>
        </div>
        <div className="addProductButton">
          <button
            style={disable ? { opacity: 0.4 } : { opacity: 1 }}
            disabled={disable}
            onClick={create}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};
