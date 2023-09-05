import './style.css'
import { EditIcon } from '../svg'
import RichTextEditor from '../editor'
import { useEffect, useState } from 'react'
import { EditPhone } from '../popup/editPhone'
import { EditPassword } from '../popup/editPassword'
import { useDispatch, useSelector } from 'react-redux'
import { MyProfileSkeleton } from '../skeletons/myProfile'
import { GetCategories, GetCities, MyProfile, UpdateAbout, UpdateCities, UpdateCode, UpdateCountry, UpdateName, UpdatePhone, UpdateSite, UpdateSuccessful, UpdateTelegram } from '../../Redux/action/myProfile_action'

export const ProfileFields = () => {
    const dispatch = useDispatch()
    const updateSuccess = useSelector(st => st.MyProfile_reducer.update)
    const cities = useSelector(st => st.MyProfile_reducer.cities)
    // const categories = useSelector(st => st.MyProfile_reducer.categories)
    const user = useSelector(st => st.MyProfile_reducer.user)
    const [openPassword, setOpenPassword] = useState(false)
    const [openPhone, setOpenPhone] = useState(false)
    const [file, setFile] = useState()
    const [cityId, setCityId] = useState([])
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
        cities: [],
        description: '',
        name: '',
        telegram: '',
        site: '',
        phone: '',
        password: '',
        categories: ''
    })

    useEffect(() => {
        dispatch(MyProfile())
        dispatch(GetCities())
        dispatch(GetCategories())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setFile(`${process.env.REACT_APP_IMAGE}${user?.logo}`)
            const city = []
            user?.city_of_sales_manufacturer?.forEach(elm => {
                city.push(elm?.city_name)
            })
            setUserDetails({
                country: user?.made_in,
                code: user?.individual_number,
                cities: city,
                description: user?.about_us,
                name: user?.company_name,
                telegram: user?.telegram,
                site: user?.saite,
                phone: user?.phone,
                password: '',
                categories: user?.user_category_product
            })
        }
    }, [user, openPhone])

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

            fetch(`${process.env.REACT_APP_HOSTNAME}/updateLogoProizvoditel`, {
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

    function handleCityChange(event) {
        var options = event.target.options;
        let current = []
        var value = []
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(`${options[i].getAttribute('data-id')}^${options[i].value}`)
                current.push(options[i].value)
            }
        }
        setCityId(value)
        setUserDetails({ ...userDetails, cities: current })
    }

    return (<>
        {openPassword &&
            <EditPassword
                open={openPassword}
                setOpen={setOpenPassword}
            />
        }
        {openPhone &&
            <EditPhone
                open={openPhone}
                setOpen={setOpenPhone}
            />
        }
        {Object.keys(user).length
            ? <div className='myProfileBlock'>
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
                            <span>Города (продажи продукции)({userDetails?.cities?.length})</span>
                            <div className='cursor' onClick={() => setEdit({ ...edit, cities: true })}>
                                <EditIcon />
                            </div>
                        </div>
                        <select
                            value={userDetails?.cities}
                            onChange={handleCityChange}
                            disabled={!edit.cities}
                            style={edit.cities ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                            multiple
                        >
                            {cities?.map((e, i) => (
                                <option key={i} data-id={e?.id}>
                                    {e?.name ? e?.name : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                    {edit?.cities && <div>
                        <button className='profileEditButton' onClick={() => dispatch(UpdateCities(cityId))}>Обновить</button>
                    </div>}
                    <div className='eachProfileField'> {/* Доп. информация */}
                        <div className='profileFieldName'>
                            <span>Доп. информация</span>
                            <div className='cursor' onClick={() => setEdit({ ...edit, description: true })}>
                                <EditIcon />
                            </div>
                        </div>
                        {edit?.description
                            ? <RichTextEditor userDetails={userDetails} setUserDetails={setUserDetails} />
                            : <div className='aboutBlock' dangerouslySetInnerHTML={{ __html: userDetails?.description }} />
                        }
                    </div>
                    {edit?.description && <div>
                        <button className='profileEditButton' onClick={() => dispatch(UpdateAbout(userDetails?.description))}>Обновить</button>
                    </div>}
                </div>
                <div className='profileMiddleBlocks'>
                    <div className='eachProfileField'> {/* Название */}
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
                            <div className='cursor' onClick={() => setOpenPhone(true)}>
                                <EditIcon />
                            </div>
                        </div>
                        <input
                            disabled
                            value={userDetails?.phone ? userDetails?.phone : ''}
                        />
                    </div>
                    {edit?.phone && <div>
                        <button className='profileEditButton' onClick={() => dispatch(UpdatePhone(userDetails?.phone))}>Обновить</button>
                    </div>}
                    <div className='eachProfileField'> {/* Пароль */}
                        <div className='profileFieldName'>
                            <span>Пароль</span>
                            <div className='cursor' onClick={() => setOpenPassword(true)}>
                                <EditIcon />
                            </div>
                        </div>
                        <input
                            disabled
                            value={''}
                        />
                    </div>
                    {/* <div className='eachProfileField'>
                    <div className='profileFieldName'>
                        <span>Категории ({userDetails?.categories?.length})</span>
                        <div className='cursor'>
                            <EditIcon />
                        </div>
                    </div>
                    <select
                        disabled
                        multiple
                    >
                        {categories?.map((e, i) => (
                            <option
                                key={i}
                            // value={e?.name ? e?.name : ''}
                            >
                                {e?.name ? e?.name : ''}
                            </option>
                        ))}
                    </select>
                </div> */}
                </div>
            </div>
            : <div className='myProfileBlock'>
                <MyProfileSkeleton />
            </div>
        }
    </>)
}