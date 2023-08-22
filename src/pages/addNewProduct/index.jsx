import './style.css'
import { useState } from 'react'
import { RublIcon } from '../../components/svg'
import { PageNavigation } from '../../components/pageNavigation'

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

    function handleImageChange(event) {
        let targetFiles = event.target.files
        let targetFilesObject = [...targetFiles] // file

        // if (targetFilesObject.length > 10) {
        //     setOpen(true)
        //     setErrorMessage('Вы не можете загрузить более 10 файлов.')
        //     return
        // }

        // let fileSize = +(e.size * 0.000001).toFixed(4).split('.')[0]; // B -> MB
        // if (fileSize > 10) {
        //     return
        // }

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
                <div className='myProfileBlock'>
                    <div className='addProductEachBlock'>
                        <div className='eachProfileField'>
                            <div className='profileFieldName'>
                                <span>Имя продукции</span>
                            </div>
                            <input
                                value={details.name}
                                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                                placeholder='Имя продукции'
                            />
                        </div>
                        <div className='eachProfileField'>
                            <div className='profileFieldName'>
                                <span>Корпус</span>
                            </div>
                            <input
                                value={details.body}
                                onChange={(e) => setDetails({ ...details, body: e.target.value })}
                                placeholder='Корпус'
                            />
                        </div>
                        <div className='eachProfileField'>
                            <div className='profileFieldName'>
                                <span>Длина</span>
                            </div>
                            <input
                                value={details.width}
                                onChange={(e) => setDetails({ ...details, width: e.target.value })}
                                placeholder='Длина'
                            />
                        </div>
                        <div className='eachProfileField'>
                            <div className='profileFieldName'>
                                <span>Доп. информация</span>
                            </div>
                            <textarea
                                value={details?.description}
                                onChange={(e) => setDetails({ ...details, description: e.target.value })}
                                placeholder='Текст информации'
                            />
                        </div>
                        <div className='eachProfileField'>
                            <div className='profileFieldName'>
                                <span>Цена</span>
                            </div>
                            <div className='addProductPrice'>
                                <input
                                    value={details.price}
                                    type='number'
                                    onChange={(e) => setDetails({ ...details, price: e.target.value })}
                                    placeholder='Цена'
                                />
                                <RublIcon />
                            </div>
                        </div>
                    </div>
                    <div className='addProductEachBlock'>
                        <div className='eachProfileField'>
                            <div className='profileFieldName'>
                                <span>Категория</span>
                            </div>
                            <select >
                                {details?.categories?.map((e, i) => (
                                    <option
                                        key={i}
                                        value={e?.title}
                                        onChange={(e) => setDetails({ ...details, selectedCategory: e.target.value })}
                                    >
                                        {e?.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='eachProfileField'>
                            <div className='profileFieldName'>
                                <span>Столешница</span>
                            </div>
                            <input
                                value={details?.top}
                                onChange={(e) => setDetails({ ...details, top: e.target.value })}
                                placeholder='Столешница'
                            />
                        </div>
                        <div className='eachProfileField'>
                            <div className='profileFieldName'>
                                <span>Фасады</span>
                            </div>
                            <input
                                value={details?.facades}
                                onChange={(e) => setDetails({ ...details, facades: e.target.value })}
                                placeholder='Фасады'
                            />
                        </div>
                    </div>
                </div>
                <div className='newProductPhotoBlock'>
                    <label>Фотографии продукта</label>
                    <button>Загрузить</button>
                    <div className='newProductPhotos' />
                </div>
                <div className='addProductButton'>
                    <button>Добавить</button>
                </div>
            </div>
        </div>
    )
}