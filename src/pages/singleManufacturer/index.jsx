import './style.css'
import { Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { EachProduct } from '../../components/eachProduct'
import { PageNavigation } from '../../components/pageNavigation'
import { SingleProduct } from '../../components/popup/singleProduct'
import { FilterCategories } from '../../Redux/action/product_action'
import { GetSingleManufacturer } from '../../Redux/action/manufacturer_ation'
import { ManufacturerDescription } from '../../components/popup/manufacturerDescription'
import { SingleManufacturerSkeleton } from '../../components/skeletons/singleManufacturer'
import { CheckboxChecked, CheckboxNotChecked, CubicIcon, DocumentIcon, InfoIcon, InternetIcon, RemoveIcon, ReviewIcon, TelegramIcon, VerificationIcon, WhatsappIcon } from '../../components/svg'

export const SingleManufacturer = () => {
    const dispatch = useDispatch()
    const manufacturer = useSelector(st => st.Manufacturer_reducer.singleManufacturerUser)
    const categories = useSelector(st => st.Manufacturer_reducer.singleManufacturerCategories)
    const cities = useSelector(st => st.Manufacturer_reducer.singleManufacturerCities)
    const products = useSelector(st => st.Manufacturer_reducer.singleManufacturerProducts)
    const [openSingleProductPopup, setOpenSingleProductPopup] = useState(false)
    const [userId] = useState(window.location.pathname.split('/')[2])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [checked, setChecked] = useState(false)
    const [openDescription, setOpenDescription] = useState(false)
    const [myCategories, setMyCategories] = useState([])

    useEffect(() => {
        dispatch(GetSingleManufacturer(userId))
    }, [userId, dispatch])

    useEffect(() => {
        if (manufacturer) {
            if (manufacturer?.show_room?.includes('Да') || manufacturer?.show_room?.includes('да')) {
                setChecked(true)
            } else {
                setChecked(false)
            }
        }
    }, [manufacturer])

    useEffect(() => {
        if (categories) {
            let category = []
            categories.user_category_product
                ?.filter(e => e.parent_category_name)
                ?.forEach(element => {
                    category.push({ selected: false, name: element.parent_category_name, id: element.parent_category_id })
                })
            setMyCategories(category)
        }
    }, [categories])

    useEffect(() => {
        if (myCategories) {
            myCategories.forEach(element => {
                if (element.selected) {
                    dispatch(FilterCategories(element.name, manufacturer?.id))
                }
            })
        }
    }, [myCategories, dispatch])

    // import fileDownload from 'js-file-download'
    // function download(url, filename) {
    //     axios.get(url, {
    //         responseType: 'blob',
    //     }).then(res => {
    //         fileDownload(res.data, filename);
    //     });
    // }

    const toggleCategorySelection = (categoryId) => {
        const updatedCategories = myCategories.map(category => {
            if (category.id === categoryId) return { ...category, selected: true }
            else return { ...category, selected: false }
        })
        setMyCategories(updatedCategories)
    }


    function handleClick(e) {
        setSelectedProduct(e)
        setOpenSingleProductPopup(true)
    }

    function handleProtocol(url) {
        const protocolRegex = /^https?:\/\//i;
        if (protocolRegex.test(url)) {
            return url
        } else {
            return 'http://' + url
        }
    }

    return (<>
        {openSingleProductPopup &&
            <SingleProduct
                open={openSingleProductPopup}
                setOpen={setOpenSingleProductPopup}
                product={selectedProduct}
            />
        }
        {openDescription &&
            <ManufacturerDescription
                open={openDescription}
                setOpen={setOpenDescription}
                description={manufacturer?.about_us}
            />
        }
        <div className='singleManuPage'>
            <PageNavigation
                backButton={true}
                onClick={() => window.location = '/'}
                title={'Все производители'}
                search={false}
                searchText={''}
                setSearchText={''}
            />
            {Object.keys(manufacturer) && categories.length && cities.length
                ? <>
                    <div className='singleManuBlock'>
                        <div className='singleManuDetails'>
                            <div className='singleManuDetailsLeft'>
                                <img alt='' src={`${process.env.REACT_APP_IMAGE}${manufacturer?.logo}`} />
                                <div className='singleManuDetailsLeftRight'>
                                    <h1>{manufacturer?.company_name}</h1>
                                    <span>{manufacturer?.made_in}</span>
                                    <div className='singleManuDeailsIcons'>
                                        {manufacturer?.saite && manufacturer.saite !== 'null' &&
                                            <Tooltip title='Перейти на сайт'>
                                                <div onClick={() => window.open(handleProtocol(manufacturer?.saite), '_blank')} className='cursor'><InternetIcon /></div>
                                            </Tooltip>
                                        }
                                        {manufacturer?.telegram && manufacturer.telegram !== 'null' &&
                                            <Tooltip title='Перейти на телеграм'>
                                                <div className='cursor' onClick={() => window.open(`https://t.me/${manufacturer?.telegram}`, '_blank')}><TelegramIcon /></div>
                                            </Tooltip>
                                        }
                                        {manufacturer?.extract && manufacturer.extract !== 'null' &&
                                            <Tooltip title='Скачать выписку'>
                                                <div className='cursor' onClick={() => window.open(`${process.env.REACT_APP_IMAGE}${manufacturer?.extract}`, '_blank')}><DocumentIcon /></div>
                                            </Tooltip>
                                        }
                                        {(manufacturer?.job_with_designer?.includes('Да') || manufacturer?.job_with_designer?.includes('да')) &&
                                            <Tooltip title='Этот производитель сотрудничает с дизайнерами'>
                                                <div className='cursor'><VerificationIcon /></div>
                                            </Tooltip>
                                        }
                                        {(manufacturer?.dmodel?.includes('Да') || manufacturer?.dmodel?.includes('да')) &&
                                            <Tooltip title='Этот производитель предоставляет 3d модели'>
                                                <div className='cursor'><CubicIcon /></div>
                                            </Tooltip>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='singleManuDetailsRight'>
                                <div className='singleManuDetailsRightCheckbox'>
                                    <span>Шоурум</span>
                                    <div onClick={() => setChecked(!checked)} className='cursor'>
                                        {checked ? <CheckboxChecked /> : <CheckboxNotChecked />}
                                    </div>
                                </div>
                                <div className='singleManuDetailsRightIcons'>
                                    <div className='eachSingleManuDetailsRightIcon' onClick={() => setOpenDescription(true)}>
                                        <InfoIcon />
                                        <span>Доп. информация</span>
                                    </div>
                                    <div className='eachSingleManuDetailsRightIcon' onClick={() => window.open(`https://wa.me/${manufacturer?.watsap_phone}`, '_blank')}>
                                        <WhatsappIcon />
                                        <span>Написать в Whatsapp</span>
                                    </div>
                                    <div className='eachSingleManuDetailsRightIcon'>
                                        <ReviewIcon />
                                        <span>Отзывы</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {myCategories.length > 0 &&
                            <div className='myProductCategories'>
                                {myCategories?.map((e, i) => (
                                    <button
                                        key={i}
                                        className='eachProductCategory'
                                        style={e?.selected ? { background: 'var(--2-d-9-efb, #2D9EFB)', color: '#fff' } : {}}
                                        onClick={() => toggleCategorySelection(e.id)}
                                    >
                                        {e?.name}
                                    </button>
                                ))}
                                <button className='eachProductCategory' onClick={() => dispatch(GetSingleManufacturer(userId))}><RemoveIcon /></button>
                            </div>
                        }
                    </div>
                    <div className='singleManuBlock'>
                        <div className='singleManuFilter'>
                            <select>
                                {cities?.map((e, i) => (
                                    <option key={i}>{e?.city_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='singleManuProducts'>
                            {products.length > 0
                                ? products.map((e, i) => (
                                    <EachProduct onClick={() => handleClick(e)} product={e} key={i} />
                                ))
                                : <span>Нет товаров</span>
                            }
                        </div>
                    </div></>
                : <SingleManufacturerSkeleton />
            }
        </div>
    </>)
}