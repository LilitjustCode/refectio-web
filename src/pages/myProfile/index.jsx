import './style.css'
import { useState } from 'react'
import { EditIcon } from '../../components/svg'
import { PageNavigation } from '../../components/pageNavigation'

export const MyProfile = () => {

    const [details, setDetails] = useState({
        country: 'Италия',
        code: '7727563778',
        cities: [
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
        selectedCountry: 'Москва',
        description: 'Текст информации',
        name: 'Лайт кухни',
        telegram: 'Линк',
        site: 'Линк',
        phone: '+7 (909) 099-99-99',
        password: '**********',
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
        selectedCategory: 'Кухня'
    })
    const [edit, setEdit] = useState({
        country: false,
        code: false,
        cities: false,
        description: false,
        name: false,
        telegram: false,
        site: false,
        phone: false,
        password: false,
        categories: false
    })

    return (
        <div className='myProfilePage'>
            <PageNavigation
                backButton={false}
                title={false}
                search={false}
                navigation={[
                    {
                        title: 'Профиль',
                        path: '/profile'
                    }
                ]}
            />
            <div className='profileBlock'>
                <div className='myProfileBlock'>
                    <div className='profileMiddleBlocks'>
                        <div className='profileNameBlock'>
                            <img alt='' src={require('../../assets/manufacturer.png')} />
                            <button>Изменить</button>
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

                <div className='profileButton'>
                    <button onClick={() => window.location = '/myProducts'}>Мои товары</button>
                    <button>Выйти</button>
                </div>
            </div>
        </div>
    )
}