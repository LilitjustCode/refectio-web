import './style.css'
import { RublIcon } from '../svg'

export const NewProductFields = ({ details, setDetails, nameError }) => {
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
                        style={nameError ? { border: '1px solid red' } : {}}
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
                    <select
                    >
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