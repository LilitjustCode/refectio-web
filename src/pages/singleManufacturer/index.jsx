import './style.css'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { EachProduct } from '../../components/eachProduct'
import { PageNavigation } from '../../components/pageNavigation'
import { SingleProduct } from '../../components/popup/singleProduct'
import { GetSingleManufacturer } from '../../Redux/action/manufacturer_ation'
import { CheckboxChecked, CheckboxNotChecked, CubicIcon, DocumentIcon, InfoIcon, InternetIcon, ReviewIcon, TelegramIcon, VerificationIcon, WhatsappIcon } from '../../components/svg'

export const SingleManufacturer = () => {
    const dispatch = useDispatch()
    // const manufacturer = useSelector(st => st.Manufacturer_reducer.singleManufacturer)
    const products = useSelector(st => st.Product_reducer.products)
    const [openSingleProductPopup, setOpenSingleProductPopup] = useState(false)
    const [userId] = useState(window.location.pathname.split('/')[2])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [checked, setChecked] = useState(false)
    const [categories, setCategories] = useState([
        {
            id: 1,
            title: 'Кухни',
            selected: true,
        },
        {
            id: 2,
            title: 'Прихожые',
            selected: false,
        },
        {
            id: 3,
            title: 'Гостиные',
            selected: false,
        },
        {
            id: 4,
            title: 'Детские',
            selected: false,
        },
    ])

    useEffect(() => {
        dispatch(GetSingleManufacturer(userId))
    }, [userId, dispatch])

    function toggleCategorySelection(categoryId) {
        const updatedCategories = categories.map((category) => {
            if (category.id === categoryId) {
                return {
                    ...category,
                    selected: !category.selected,
                }
            }
            return category;
        })
        setCategories(updatedCategories)
    }

    function handleClick(e) {
        setSelectedProduct(e)
        setOpenSingleProductPopup(true)
    }

    return (<>
        {openSingleProductPopup &&
            <SingleProduct
                open={openSingleProductPopup}
                setOpen={setOpenSingleProductPopup}
                product={selectedProduct}
            />
        }
        <div className='singleManuPage'>
            <PageNavigation
                backButton={true}
                onClick={() => window.location = '/'}
                title={'Все производители'}
                search={false}
            />
            <div className='singleManuBlock'>
                <div className='singleManuDetails'>
                    <div className='singleManuDetailsLeft'>
                        <img alt='' src={require('../../assets/manufacturer.png')} />
                        <div className='singleManuDetailsLeftRight'>
                            <h1>Лайт Кухни</h1>
                            <span>Италия</span>
                            <div className='singleManuDeailsIcons'>
                                <div className='cursor'><InternetIcon /></div>
                                <div className='cursor'><TelegramIcon /></div>
                                <div className='cursor'><DocumentIcon /></div>
                                <div className='cursor'><VerificationIcon /></div>
                                <div className='cursor'><CubicIcon /></div>
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
                            <div className='eachSingleManuDetailsRightIcon'>
                                <InfoIcon />
                                <span>Доп. информация</span>
                            </div>
                            <div className='eachSingleManuDetailsRightIcon'>
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
                <div className='myProductCategories'>
                    {categories?.map((e, i) => (
                        <button
                            key={i}
                            className='eachProductCategory'
                            style={e?.selected ? { background: 'var(--2-d-9-efb, #2D9EFB)', color: '#fff' } : {}}
                            onClick={() => toggleCategorySelection(e.id)}
                        >
                            {e?.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className='singleManuBlock'>
                <div className='singleManuFilter'>
                    <select>
                        <option>Москва</option>
                        <option>Ереван</option>
                        <option>Гюмри</option>
                        <option>Москва</option>
                        <option>Ереван</option>
                        <option>Гюмри</option>
                    </select>
                </div>
                <div className='singleManuProducts'>
                    {products.length > 0
                        ? products.map((e, i) => (
                            <EachProduct onClick={handleClick} product={e} key={i} />
                        ))
                        : <span>Нет товаров</span>
                    }
                </div>
            </div>
        </div>
    </>)
}