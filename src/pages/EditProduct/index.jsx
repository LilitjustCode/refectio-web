import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { CloseIconBlue } from "../../components/svg";
import { useDispatch, useSelector } from "react-redux";
import { PageNavigation } from "../../components/pageNavigation";
import { SingleProduct } from "../../Redux/action/product_action";
import { GetCategories } from "../../Redux/action/myProfile_action";
import { EditProductFields } from "../../components/editProductFields";
import { EditProductSkeleton } from "../../components/skeletons/editProduct";

export const EditProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((st) => st.Product_reducer.singleProduct);
  const categories = useSelector((st) => st.MyProfile_reducer.categories);
  const [productId] = useState(window.location.pathname.split("/")[2]);
  const [productPhotos, setProductPhotos] = useState([]);
  const [deletedPhotos, setDeletedPhotos] = useState([]);
  const [status, setStatus] = useState(false);
  const [newPhotos, setNewPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubcategory, setSelectedSubcategory] = useState();
  const [categoryHasSubcategory, setCategoryHasSubcategory] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    frame: "",
    facades: "",
    length: "",
    height: "",
    price: "",
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
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(GetCategories());
    dispatch(SingleProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    (productPhotos || newPhotos || files) &&
      setErrors({ ...errors, photo: "" });
  }, [productPhotos, newPhotos, files]);

  useEffect(() => {
    errors && window.scrollTo({ bottom: 100, behavior: "smooth" });
  }, [errors]);

  useEffect(() => {
    // console.log(product, "proddd");
    if (product) {
      setDetails({
        name: product?.name ? product?.name : "",
        frame: product?.frame ? product?.frame : "",
        facades: product?.facades ? product?.facades : "",
        length: product?.length ? product?.length : "",
        height: product?.height ? product?.height : "",
        price: product?.price ? product?.price : "",
        tabletop: product?.tabletop ? product?.tabletop : "",
        profile: product?.profile ? product?.profile : "",
        material: product?.material ? product?.material : "",
      });
      setDescription(product?.about);
      setProductPhotos(product?.product_image);
      const category = categories?.filter(
        (elm) => +elm.id === +product?.parent_category_id
      )[0];
      setSelectedCategory(category);
      if (product?.category_id) {
        setCategoryHasSubcategory(true);
        setSelectedSubcategory(
          category?.childrens?.filter(
            (elm) => +elm.id === +product.category_id
          )[0]
        );
      } else {
        setCategoryHasSubcategory(false);
      }
    }
  }, [product, categories]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  //   console.log(description);
  function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    setNewPhotos([...newPhotos, ...ImagesArray]);
    const filesArray = Object.values(e.target.files);
    setFiles([...files, ...filesArray]);
  }

  function deleteFile(elm, i) {
    const oldPhoto = productPhotos.filter((e) => +e.id === +elm.id)[0];
    if (oldPhoto) {
      setDeletedPhotos([...deletedPhotos, oldPhoto?.id]);
      setProductPhotos(productPhotos.filter((e) => +e.id !== +elm.id));
    } else {
      setNewPhotos(newPhotos.filter((item, index) => index !== i));
      setFiles(files.filter((item, index) => index !== i));
    }
  }

  function update() {
    setStatus(true);
    if (!details?.name?.length) {
      setStatus(false);
      setErrors({ ...errors, name: " " });
    } else if (!selectedCategory) {
      setStatus(false);
      setErrors({ ...errors, name: "", category: " " });
    }
    // else if (
    //   selectedCategory &&
    //   categoryHasSubcategory &&
    //   selectedSubcategory
    // ) {
    //   setStatus(false);
    //   setErrors({ ...errors, name: "", category: "", subcategory: " " });
    // }
    else if (!files?.length && !productPhotos?.length && !newPhotos?.length) {
      setStatus(false);
      setErrors({
        ...errors,
        name: "",
        category: "",
        subcategory: "",
        photo: "Обязательное поле",
      });
    } else {
      setStatus(false);
      setErrors({
        ...errors,
        name: "",
        category: "",
        subcategory: "",
        photo: "",
      });
      const token = localStorage.getItem("token");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const formdata = new FormData();
      formdata.append("product_id", product?.id);
      formdata.append("parent_category_id", selectedCategory?.id);
      formdata.append("parent_category_name", selectedCategory?.name);
      if (selectedSubcategory) {
        formdata.append("category_id", selectedSubcategory?.id);
        formdata.append("category_name", selectedSubcategory?.name);
      }
      formdata.append("name", details?.name);
      formdata.append("frame", details?.frame);
      formdata.append("facades", details?.facades);
      formdata.append("length", details?.length);
      formdata.append("height", details?.height);
      formdata.append("price", details?.price);
      formdata.append("tabletop", details?.tabletop);
      formdata.append("profile", details.profile);
      {
        description == null
          ? formdata.append("about", "")
          : formdata.append(
              "about",
              description.description ? description.description : description
            );
      }

      formdata.append("material", details.material);
      deletedPhotos?.length &&
        deletedPhotos?.forEach((elm) => {
          formdata.append("Deletephoto[]", elm);
        });
      files?.length &&
        files?.forEach((elm) => {
          formdata.append("photo[]", elm);
        });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_HOSTNAME}/UpdateProduct`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result, "update");
          if (result.status) {
            setStatus(true);
            window.location = "/my-products";
          }
        })
        .catch((error) => console.log("error", error));
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <ClipLoader color="#2d9efb" />
      </div>
    );
  } else {
    return (
      <div className="newProductPage">
        <PageNavigation
          backButton={true}
          onClick={() => (window.location = "/my-products")}
          title={"Редактирование продукта"}
          navigation={false}
          search={false}
          searchText={""}
          setSearchText={""}
        />
        <div className="newProductBlock">
          <EditProductFields
            details={details}
            setDetails={setDetails}
            errors={errors}
            setErrors={setErrors}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            setCategoryHasSubcategory={setCategoryHasSubcategory}
            description={description == null ? "" : description}
            setDescription={setDescription}
          />
          <div className="newProductPhotoBlock">
            <label>Фотографии продукта</label>
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
              {
                productPhotos?.length > 0 &&
                  productPhotos?.map((e, i) => (
                    <div className="eachProductPhoto" key={i}>
                      <img
                        alt=""
                        src={`${process.env.REACT_APP_IMAGE}${e?.image}`}
                      />
                      <div
                        className="deletePhoto"
                        onClick={() => deleteFile(e, i)}
                      >
                        <CloseIconBlue />
                      </div>
                    </div>
                  ))
                // : <EditProductSkeleton />
              }
              {newPhotos?.length > 0 &&
                newPhotos?.map((e, i) => (
                  <div className="eachProductPhoto" key={i}>
                    <img alt="" src={e} />
                    <div
                      className="deletePhoto"
                      onClick={() => deleteFile(e, i)}
                    >
                      <CloseIconBlue />
                    </div>
                  </div>
                ))}
              {errors.photo && (
                <span style={{ color: "red" }}>{errors.photo}</span>
              )}
            </div>
          </div>
          {status ? (
            <div style={{ opacity: 0.4 }} className="addProductButton">
              <button disabled>Сохранить</button>
            </div>
          ) : (
            <div className="addProductButton">
              <button onClick={update}>Сохранить</button>
            </div>
          )}
        </div>
      </div>
    );
  }
};
