import './style.css'
import { useState } from 'react'
import { CloseIconBlue } from '../../components/svg'
import { PageNavigation } from '../../components/pageNavigation'
import { NewProductFields } from '../../components/newProductFields'

export const AddNewProduct = () => {
    const [details, setDetails] = useState({
        name: '',
        body: '',
        width: '',
        description: '',
        price: '',
        top: '',
        facades: '',
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

    return (
        <div className='newProductPage'>
            <PageNavigation
                backButton={true}
                title={'Добавление продукции'}
                navigation={false}
                search={false}
            />
            <div className='newProductBlock'>
                <NewProductFields details={details} setDetails={setDetails} />
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
                    <button>Добавить</button>
                </div>
            </div>
        </div>
    )
}