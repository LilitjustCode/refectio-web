import './style.css'
import { RublIcon } from '../svg'

export const NewProductFields = ({ details, setDetails }) => {
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
    )
}