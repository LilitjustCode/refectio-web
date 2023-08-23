import './style.css'
import { useState } from 'react'
import { EditIcon } from '../svg'

export const ProfileFields = ({ details, setDetails }) => {
    const [file, setFile] = useState('blob:http://localhost:3000/14063458-a153-4128-868f-34ebc37feeaa')

    function uploadSingleFile(e) {
        if (e.target.files.length) {
            setFile(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div className='myProfileBlock'>
            <div className='profileMiddleBlocks'>
                <div className='profileNameBlock'>
                    <img alt='' src={file} />
                    <button>
                        Изменить
                        <input type='file' id='fileInput' onChange={uploadSingleFile} />
                    </button>
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Страна производства</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled
                        value={details.country}
                        onChange={(e) => setDetails({ ...details, country: e.target.value })}
                    />
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>ИНН</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled
                        value={details.code}
                        onChange={(e) => setDetails({ ...details, code: e.target.value })}
                    />
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Города (продажи продукции)(5)</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <select disabled>
                        {details?.cities?.map((e, i) => (
                            <option
                                key={i}
                                value={e?.title}
                                onChange={(e) => setDetails({ ...details, code: e.target.value })}
                            >
                                {e?.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Доп. информация</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <textarea
                        disabled
                        value={details?.description}
                        onChange={(e) => setDetails({ ...details, description: e.target.value })}
                    />
                </div>
            </div>
            <div className='profileMiddleBlocks'>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Название</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled
                        value={details?.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    />
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Телеграм Канал</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled
                        value={details?.telegram}
                        onChange={(e) => setDetails({ ...details, telegram: e.target.value })}
                    />
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Сайт</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled
                        value={details?.site}
                        onChange={(e) => setDetails({ ...details, site: e.target.value })}
                    />
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Номер телефона</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled
                        value={details?.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    />
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Пароль</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled
                        value={details?.password}
                        onChange={(e) => setDetails({ ...details, password: e.target.value })}
                    />
                </div>
                <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Категории (8)</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <select disabled>
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
            </div>
        </div>
    )
}