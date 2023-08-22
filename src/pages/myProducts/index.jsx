import './style.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { PlusSign } from '../../components/svg'
import { PageNavigation } from '../../components/pageNavigation'

export const MyProducts = () => {
    const products = useSelector(st => st.Product_reducer.products)
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
                                <img alt='' src={require(`../../assets/${e?.image}`)} />
                                <h2>{e?.title}</h2>
                                <span>Фасады : {e?.facades}</span>
                                <span>Корпус : {e?.body}</span>
                                <span>Столешница : {e?.top}</span>
                                <span>Длина : {e?.width}</span>
                                <span>Цена : {e?.price}</span>
                                <div className='eachProductButtons'>
                                    <button>Редактировать</button>
                                    <button>Удалить</button>
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