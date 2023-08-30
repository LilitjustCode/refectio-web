import './style.css'
import { useEffect, useState } from 'react'
import { PlusSign } from '../../components/svg'
import { useDispatch, useSelector } from 'react-redux'
import { PageNavigation } from '../../components/pageNavigation'
import { AllMyProducts, DeleteProduct, UpdateSuccess } from '../../Redux/action/product_action'

export const MyProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector(st => st.Product_reducer.myProducts)
    // const update = useSelector(st => st.Product_reducer.update)
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
        dispatch(AllMyProducts())
    }, [dispatch])

    // useEffect(() => {
    //     if (update) {
    //         dispatch(AllMyProducts())
    //     }
    //     dispatch(UpdateSuccess())
    // }, [update, dispatch])

    const toggleCategorySelection = (categoryId) => {
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

    function deleteProduct(id) {
        const agree = window.confirm('Вы действительно хотите удалить этот продукт?')
        agree && dispatch(DeleteProduct([id]))
    }

    return (
        <div className='myProductsPage'>
            <PageNavigation
                backButton={false}
                title={false}
                search={false}
                navigation={[
                    {
                        title: 'Профиль',
                        path: '/profile'
                    },
                    {
                        title: 'Каталог',
                        path: '/myProducts'
                    }
                ]}
            />
            <div className='myProductsBlock'>
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
                    <button className='eachProductCategory'><PlusSign /></button>
                </div>
                <div className='myProducts'>
                    {products.length > 0
                        ? products?.map((e, i) => (
                            <div key={i} className='eachProduct'>
                                <img alt='' src={`${process.env.REACT_APP_IMAGE}${e?.product_image[0]?.image}`} />
                                <h2>{e?.name}</h2>
                                <span>Фасады: {e?.facades}</span>
                                <span>Корпус: {e?.frame}</span>
                                <span>Столешница: {e?.tabletop}</span>
                                <span>Длина: {e?.length} м.</span>
                                <span>Цена: {e?.price}</span>
                                {e?.about && <div className='about' dangerouslySetInnerHTML={{ __html: `about: ${e?.about}` }} />}
                                <div className='eachProductButtons'>
                                    <button>Редактировать</button>
                                    <button onClick={() => deleteProduct(e?.id)}>Удалить</button>
                                </div>
                            </div>
                        ))
                        : <span>Нет товаров</span>
                    }
                </div>
                <div className='myProductsButton'>
                    <button onClick={() => window.location = '/addNewProduct'}>Добавить</button>
                </div>
            </div>
        </div>
    )
}