import './style.css'
import { RublIcon } from '../svg'

export const NewProductFields = ({ details, setDetails, errors, categories, selectedCategory, setSelectedCategory, setSelectedSubcategory, setCategoryHasSubcategory }) => {
    function handleCategoryChange(event) {
        const category = categories.filter(elm => elm.id == event.target.value)[0]
        setSelectedCategory(category)
        category.childrens.length > 0 ? setCategoryHasSubcategory(true) : setCategoryHasSubcategory(false)
    }
    function handleSubcategoryChange(event) {
        setSelectedSubcategory(selectedCategory?.childrens?.filter(elm => elm.id == event.target.value)[0])
    }

    return (
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
                        style={errors.name ? { border: '1px solid red' } : {}}
                    />
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Корпус</span>
                    </div>
                    <input
                        value={details.frame}
                        onChange={(e) => setDetails({ ...details, frame: e.target.value })}
                        placeholder='Корпус'
                    />
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Длина</span>
                    </div>
                    <input
                        type='number'
                        value={details.length}
                        onChange={(e) => setDetails({ ...details, length: e.target.value })}
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
                    <select onChange={handleCategoryChange} style={errors.category ? { border: '1px solid red' } : {}}>
                        <option value=''></option>
                        {categories?.map(category => (
                            <option key={category.id} value={category?.id}>
                                {category?.name}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedCategory?.childrens.length > 0 &&
                    <div className='eachProfileField'>
                        <div className='profileFieldName'>
                            <span>Подкатегория</span>
                        </div>
                        <select onChange={handleSubcategoryChange} style={errors.subcategory ? { border: '1px solid red' } : {}}>
                            <option value=''></option>
                            {selectedCategory?.childrens?.map(subcategory => (
                                <option key={subcategory?.id} value={subcategory?.id}>
                                    {subcategory?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                }
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Столешница</span>
                    </div>
                    <input
                        value={details?.tabletop}
                        onChange={(e) => setDetails({ ...details, tabletop: e.target.value })}
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
    )
}