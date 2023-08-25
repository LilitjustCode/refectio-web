import './style.css'
import { EditIcon } from '../svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MyProfile, UpdateCode, UpdateCountry, UpdateName, UpdateSite, UpdateSuccessful, UpdateTelegram } from '../../Redux/action/myProfile_action'

export const ProfileFields = () => {
    const dispatch = useDispatch()
    const updateSuccess = useSelector(st => st.MyProfile_reducer.update)
    const user = useSelector(st => st.MyProfile_reducer.user)
    const [file, setFile] = useState()
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
    const [userDetails, setUserDetails] = useState({
        country: '',
        code: '',
        // cities: '',
        description: '',
        name: '',
        telegram: '',
        site: '',
        phone: '',
        password: '',
        // categories: ''
    })

    useEffect(() => {
        dispatch(MyProfile())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setFile(`${process.env.REACT_APP_IMAGE}${user?.logo}`)
            setUserDetails({
                country: user?.made_in,
                code: user?.individual_number,
                // cities: '',
                // description: '',
                name: user?.company_name,
                telegram: user?.telegram,
                site: user?.saite,
                phone: user?.phone,
                password: '',
                // categories: ''
            })
        }
    }, [user])

    useEffect(() => {
        if (updateSuccess) {
            setEdit({
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
            dispatch(UpdateSuccessful())
        }
    }, [updateSuccess, dispatch])

    function uploadSingleFile(e) {
        if (e.target.files.length) {
            const token = localStorage.getItem('token')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            const formdata = new FormData();
            formdata.append("logo", e.target.files[0]);

            fetch("http://194.58.119.203/Refectio/public/api/updateLogoProizvoditel", {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => result.status && setFile(URL.createObjectURL(e.target.files[0])))
                .catch(error => console.log('error', error));
        }
    }

    return (
        <div className='myProfileBlock'>
            <div className='profileMiddleBlocks'>
                <div className='profileNameBlock'> {/* avatar */}
                    <img alt='' src={file} />
                    <button className='profileEditButton'>
                        Изменить
                        <input type='file' id='fileInput' onChange={uploadSingleFile} />
                    </button>
                </div>
                <div className='eachProfileField'> {/* Страна производства */}
                    <div className='profileFieldName'>
                        <span>Страна производства</span>
                        <div className='cursor' onClick={() => setEdit({ ...edit, country: true })}>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled={!edit.country}
                        value={userDetails?.country ? userDetails?.country : ''}
                        style={edit.country ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                        onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })}
                    />
                </div>
                {edit?.country && <div>
                    <button className='profileEditButton' onClick={() => dispatch(UpdateCountry(userDetails?.country))}>Обновить</button>
                </div>}
                <div className='eachProfileField'> {/* ИНН */}
                    <div className='profileFieldName'>
                        <span>ИНН</span>
                        <div className='cursor' onClick={() => setEdit({ ...edit, code: true })}>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled={!edit.code}
                        value={userDetails?.code ? userDetails?.code : ''}
                        style={edit.code ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                        onChange={(e) => setUserDetails({ ...userDetails, code: e.target.value })}
                    />
                </div>
                {edit?.code && <div>
                    <button className='profileEditButton' onClick={() => dispatch(UpdateCode(userDetails?.code))}>Обновить</button>
                </div>}
                <div className='eachProfileField'> {/* Города */}
                    <div className='profileFieldName'>
                        <span>Города (продажи продукции)(5)</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <select
                        disabled
                    // multiple
                    >
                        {user?.city_of_sales_manufacturer?.map((e, i) => (
                            <option
                                key={i}
                            // value={e?.city_name}
                            >
                                {e?.city_name ? e?.city_name : ''}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='eachProfileField'> {/* Доп. информация */}
                    <div className='profileFieldName'>
                        <span>Доп. информация</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <textarea
                        disabled
                    // value={details?.description}
                    />
                </div>
            </div>
            <div className='profileMiddleBlocks'>
                <div className='eachProfileField'> { /* Название */}
                    <div className='profileFieldName'>
                        <span>Название</span>
                        <div className='cursor' onClick={() => setEdit({ ...edit, name: true })}>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled={!edit.name}
                        value={userDetails?.name ? userDetails?.name : ''}
                        style={edit.name ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    />
                </div>
                {edit?.name && <div>
                    <button className='profileEditButton' onClick={() => dispatch(UpdateName(userDetails?.name))}>Обновить</button>
                </div>}
                <div className='eachProfileField'> {/* Телеграм Канал */}
                    <div className='profileFieldName'>
                        <span>Телеграм Канал</span>
                        <div className='cursor' onClick={() => setEdit({ ...edit, telegram: true })}>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled={!edit.telegram}
                        value={userDetails?.telegram ? userDetails?.telegram : ''}
                        style={edit.telegram ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                        onChange={(e) => setUserDetails({ ...userDetails, telegram: e.target.value })}
                    />
                </div>
                {edit?.telegram && <div>
                    <button className='profileEditButton' onClick={() => dispatch(UpdateTelegram(userDetails?.telegram))}>Обновить</button>
                </div>}
                <div className='eachProfileField'> {/* Сайт */}
                    <div className='profileFieldName'>
                        <span>Сайт</span>
                        <div className='cursor' onClick={() => setEdit({ ...edit, site: true })}>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled={!edit.site}
                        value={userDetails?.site ? userDetails?.site : ''}
                        style={edit.site ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                        onChange={(e) => setUserDetails({ ...userDetails, site: e.target.value })}
                    />
                </div>
                {edit?.site && <div>
                    <button className='profileEditButton' onClick={() => dispatch(UpdateSite(userDetails?.site))}>Обновить</button>
                </div>}
                <div className='eachProfileField'> {/* Номер телефона */}
                    <div className='profileFieldName'>
                        <span>Номер телефона</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled
                        value={user?.phone ? user?.phone : ''}
                    />
                </div>
                <div className='eachProfileField'> {/* Пароль */}
                    <div className='profileFieldName'>
                        <span>Пароль</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <input
                        disabled
                        value={''}
                    />
                </div>
                <div className='eachProfileField'> {/* Категории */}
                    <div className='profileFieldName'>
                        <span>Категории (8)</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <select
                        disabled
                    >
                        {user?.user_category_product?.map((e, i) => (
                            <option
                                key={i}
                                value={e?.category_name ? e?.category_name : ''}
                            >
                                {e?.category_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}