import './style.css'
import { useEffect, useState } from 'react'
import { RemoveIcon } from '../../components/svg'
import { useDispatch, useSelector } from 'react-redux'
import { PageNavigation } from '../../components/pageNavigation'
import { MyProductsSkeleton } from '../../components/skeletons/myProducts'
import { AllMyProducts, DeleteProduct, FilterCategories } from '../../Redux/action/product_action'

export const MyProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector(st => st.Product_reducer.myProducts)
    const categories = useSelector(st => st.Product_reducer.myCategories)
    const update = useSelector(st => st.Product_reducer.update)
    const [myCategories, setMyCategories] = useState([])

    useEffect(() => {
        dispatch(AllMyProducts())
    }, [dispatch])

    useEffect(() => {
        if (categories) {
            let category = []
            categories.forEach(element => {
                category.push({ selected: false, name: element.parent_category_name, id: element.parent_category_id })
            })
            setMyCategories(category)
        }
    }, [categories])

    useEffect(() => {
        if (myCategories) {
            myCategories.forEach(element => {
                if (element.selected) {
                    dispatch(FilterCategories(element.name, localStorage.getItem('userId')))
                }
            })
        }
    }, [myCategories, dispatch])

    useEffect(() => {
        update && dispatch(AllMyProducts())
    }, [update, dispatch])

    const toggleCategorySelection = (categoryId) => {
        const updatedCategories = myCategories.map(category => {
            if (category.id === categoryId) return { ...category, selected: true }
            else return { ...category, selected: false }
        })
        setMyCategories(updatedCategories)
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
                searchText={''}
                setSearchText={''}
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
            {products.length && categories
                ? <div className='myProductsBlock'>
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
                        <button className='eachProductCategory' onClick={() => dispatch(AllMyProducts())}><RemoveIcon /></button>
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
                                        <button onClick={() => window.location = `/edit/${e?.id}`}>Редактировать</button>
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
                : <MyProductsSkeleton />
            }
        </div>
    )
}