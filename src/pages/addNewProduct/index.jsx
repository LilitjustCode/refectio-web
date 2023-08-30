import './style.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CloseIconBlue } from '../../components/svg'
import { PageNavigation } from '../../components/pageNavigation'
import { NewProductFields } from '../../components/newProductFields'
import { CreateProduct } from '../../Redux/action/product_action'

export const AddNewProduct = () => {
    const token = localStorage.getItem('token')
    const [details, setDetails] = useState({
        name: '',
        frame: '',
        facades: '',
        length: '',
        price: '',
        description: '',
        tabletop: '',
        categories: [
            {
                id: 1,
                title: 'Москва'
            },
            {
                id: 2,
                title: 'Ереван'
            },
            {
                id: 3,
                title: 'Москва'
            },
            {
                id: 4,
                title: 'Ереван'
            },
        ],
        selectedCategory: ''
    })
    const [nameError, setNameError] = useState('')
    const [files, setFiles] = useState([])

    function uploadSingleFile(e) {
        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        )
        setFiles([...files, ...ImagesArray])
    }

    function deleteFile(e) {
        const newFileList = files.filter((item, index) => index !== e)
        setFiles(newFileList)
    }

    function create() {
        if (!details.name.length) {
            setNameError(' ')
        } else {
            setNameError('')
            const myHeaders = new Headers()
            myHeaders.append("Authorization", `Bearer ${token}`)
            const formdata = new FormData()
            formdata.append("name", details.name)
            // formdata.append("frame", details.frame)
            // formdata.append("facades", details.facades)
            // formdata.append("length", details.length)
            // formdata.append("price", details.price)
            // formdata.append("tabletop", details.tabletop)
            formdata.append("photo[]", files)
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            }
            fetch(`${process.env.REACT_APP_HOSTNAME}/createnewproductProizvoditel`, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
    }

    return (
        <div className='newProductPage'>
            <PageNavigation
                backButton={true}
                onClick={() => window.location = '/myProducts'}
                title={'Добавление продукции'}
                navigation={false}
                search={false}
            />
            <div className='newProductBlock'>
                <NewProductFields details={details} setDetails={setDetails} nameError={nameError} />
                <div className='newProductPhotoBlock'>
                    <label>Фотографии продукта</label>
                    <button>
                        Загрузить
                        <input type='file' id='fileInput' onChange={uploadSingleFile} multiple />
                    </button>
                    <div className='newProductPhotos'>
                        {files.length > 0 && files.map((e, i) => (
                            <div className='eachProductPhoto' key={i}>
                                <img alt='' src={e} />
                                <div className='deletePhoto' onClick={() => deleteFile(i)}>
                                    <CloseIconBlue />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='addProductButton'>
                    <button onClick={create}>Добавить</button>
                </div>
            </div>
        </div>
    )
}