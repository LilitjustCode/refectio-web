import './style.css'
import { useEffect, useState } from 'react'
import { CloseIconBlue } from '../../components/svg'
import { useDispatch, useSelector } from 'react-redux'
import { PageNavigation } from '../../components/pageNavigation'
import { SingleProduct } from '../../Redux/action/product_action'
import { GetCategories } from '../../Redux/action/myProfile_action'
import { NewProductFields } from '../../components/newProductFields'

export const EditProduct = () => {
    const dispatch = useDispatch()
    const product = useSelector(st => st.Product_reducer.singleProduct)
    const categories = useSelector(st => st.MyProfile_reducer.categories)
    const [productId] = useState(window.location.pathname.split('/')[2])
    const [productPhotos, setProductPhotos] = useState([])

    const token = localStorage.getItem('token')
    const [details, setDetails] = useState({
        name: '',
        frame: '',
        facades: '',
        length: '',
        price: '',
        description: '',
        tabletop: '',
    })
    const [errors, setErrors] = useState({
        name: '',
        category: '',
        subcategory: '',
        photo: ''
    })
    const [files, setFiles] = useState([])
    const [photos, setPhotos] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedSubcategory, setSelectedSubcategory] = useState()
    const [categoryHasSubcategory, setCategoryHasSubcategory] = useState(false)

    useEffect(() => {
        dispatch(GetCategories())
        dispatch(SingleProduct(productId))
    }, [dispatch, productId])

    useEffect(() => {
        photos && setErrors({ ...errors, photo: '' })
    }, [photos])

    useEffect(() => {
        if (product) {
            setDetails({
                name: product?.name ? product?.name : '',
                frame: product?.frame ? product?.frame : '',
                facades: product?.facades ? product?.facades : '',
                length: product?.length ? product?.length : '',
                price: product?.price ? product?.price : '',
                description: product?.about ? product?.about : '',
                tabletop: product?.tabletop ? product?.tabletop : '',
            })
            setSelectedCategory(categories.filter(elm => elm.id == product.parent_category_id)[0])
            setProductPhotos(product?.product_image)
        }
    }, [product])

    function uploadSingleFile(e) {
        // let ImagesArray = Object.entries(e.target.files).map(e => URL.createObjectURL(e[1]))
        // setPhotos([...photos, ...ImagesArray])
        // const filesArray = Object.values(e.target.files)
        // setFiles([...files, ...filesArray])
    }

    function deleteFile(e) {
        // setPhotos(photos.filter((item, index) => index !== e))
        // setFiles(files.filter((item, index) => index !== e))
    }

    function create() {
        if (!details.name.length) {
            setErrors({ ...errors, name: ' ' })
        } else if (!selectedCategory) {
            setErrors({ ...errors, name: '', category: ' ' })
        } else if (selectedCategory && categoryHasSubcategory && !selectedSubcategory) {
            setErrors({ ...errors, name: '', category: '', subcategory: ' ' })
        } else if (!files.length) {
            setErrors({ ...errors, name: '', category: '', subcategory: '', photo: 'Обязательное поле' })
        } else {
            setErrors({ ...errors, name: '', category: '', subcategory: '', photo: '' })
            // const myHeaders = new Headers()
            // myHeaders.append("Authorization", `Bearer ${token}`)
            // const formdata = new FormData()
            // formdata.append("name", details.name)
            // formdata.append("frame", details.frame)
            // formdata.append("facades", details.facades)
            // formdata.append("length", details.length)
            // formdata.append("price", details.price)
            // formdata.append("tabletop", details.tabletop)
            // files.forEach(elm => {
            //     formdata.append("photo[]", elm)
            // })
            // formdata.append("parent_category_id", selectedCategory.id)
            // formdata.append("parent_category_name", selectedCategory.name)
            // if (selectedSubcategory) {
            //     formdata.append("category_name", selectedSubcategory?.name)
            //     formdata.append("category_id", selectedSubcategory.id)
            // }
            // const requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: formdata,
            //     redirect: 'follow'
            // }
            // fetch(`${process.env.REACT_APP_HOSTNAME}/createnewproductProizvoditel`, requestOptions)
            //     .then(response => response.json())
            //     .then(result => {
            //         if (result.status) window.location = '/myProducts'
            //     })
            //     .catch(error => console.log('error', error));
        }
    }

    return (
        <div className='newProductPage'>
            <PageNavigation
                backButton={true}
                onClick={() => window.location = '/myProducts'}
                title={'Редактирование продукта'}
                navigation={false}
                search={false}
            />
            <div className='newProductBlock'>
                <NewProductFields
                    details={details}
                    setDetails={setDetails}
                    errors={errors}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSubcategory={setSelectedSubcategory}
                    setCategoryHasSubcategory={setCategoryHasSubcategory}
                />
                <div className='newProductPhotoBlock'>
                    <label>Фотографии продукта</label>
                    <button>
                        Загрузить
                        <input type='file' id='fileInput' onChange={uploadSingleFile} multiple />
                    </button>
                    <div className='newProductPhotos'>
                        {productPhotos?.length > 0 && productPhotos?.map((e, i) => (
                            <div className='eachProductPhoto' key={i}>
                                <img alt='' src={`${process.env.REACT_APP_IMAGE}${e?.image}`} />
                                <div className='deletePhoto' onClick={() => deleteFile(i)}>
                                    <CloseIconBlue />
                                </div>
                            </div>
                        ))}
                        {errors.photo && <span style={{ color: 'red' }}>{errors.photo}</span>}
                    </div>
                </div>
                <div className='addProductButton'>
                    <button onClick={create}>Добавить</button>
                </div>
            </div>
        </div>
    )
}