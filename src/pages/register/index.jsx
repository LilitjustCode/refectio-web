import './style.css'
import { useState, useEffect } from 'react'
import ReactInputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'
import { OpenedEye, ClosedEye } from '../../components/svg'
import { GetCities } from '../../Redux/action/myProfile_action'

export const Register = () => {
    const dispatch = useDispatch()
    const loginError = useSelector(st => st.Auth_reducer.loginError)
    const cities = useSelector(st => st.MyProfile_reducer.cities)
    const [showPassword, setShowPassword] = useState(false)
    const [selected, setSelected] = useState([])
    const [errors, setErrors] = useState({
        phoneError: '',
        passwordError: ''
    })
    const [details, setDetails] = useState({
        name: '',
        code: '',
        phone: '',
        whatsapp: '',
        country: '',
        selectedCountries: selected,
        site: '',
        telegram: '',
        showroom: false,
        designer: false,
        models: false,
    })

    useEffect(() => {
        dispatch(GetCities())
    }, [dispatch])

    function register() {
        // if (!phone || phone.includes('_')) {
        //     setErrors({ ...errors, phoneError: 'Обязательное поле' })
        // } else if (!password.length) {
        //     setErrors({ ...errors, phoneError: '', passwordError: 'Обязательное поле' })
        // } else if (password.length < 6) {
        //     setErrors({ ...errors, passwordError: 'Пароль должен содержать не менее 6-ти символов.' })
        // } else {
        //     setErrors({ phoneError: '', passwordError: '' })
        //     dispatch(AuthUser(phone, password))
        // }
    }

    return (
        <div className='loginPage'>
            <div className='loginBlock' style={{maxHeight: '500px', overflow: 'auto'}}>
                <div className='loginTitle'>
                    <h1>Регистрация</h1>
                    <span onClick={() => window.location = '/auth/register'}>Вход</span>
                </div>
                <div className='loginInputs'>
                    <label>Название</label>
                    <input
                        value={details?.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    />
                </div>
                <div className='loginInputs'>
                    <label>ИНН</label>
                    <input
                        value={details?.code}
                        onChange={(e) => setDetails({ ...details, code: e.target.value })}
                    />
                </div>
                <div className='loginInputs'>
                    <label>Номер телефона</label>
                    <ReactInputMask
                        mask="+7 (999) 999-99-99"
                        maskChar="_"
                        value={details?.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    />
                    <span className='phoneCodeRegister'>Придёт звонок с кодом</span>
                </div>
                <div className='loginInputs'>
                    <label>Номер Whatsapp-для запроса стоимости</label>
                    <input
                        value={details?.whatsapp}
                        onChange={(e) => setDetails({ ...details, whatsapp: e.target.value })}
                    />
                </div>
                <div className='loginInputs'>
                    <label>Страна производства</label>
                    <input
                        value={details?.country}
                        onChange={(e) => setDetails({ ...details, country: e.target.value })}
                    />
                </div>
                <div className='eachProfileField loginInputs'>
                    <label>Города (продажи продукции)({selected?.length})</label>
                    <MultiSelect
                        options={cities}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                        overrideStrings={{
                            allItemsAreSelected: 'Все города выбраны.',
                            clearSearch: 'Очистить поиск',
                            clearSelected: 'Очистить выбранное',
                            noOptions: 'Нет выбора',
                            search: 'Поиск',
                            selectAll: 'Выбрать все',
                            selectAllFiltered: 'Выбрать все (отфильтровано)',
                            selectSomeItems: 'Выбирать...',
                        }}
                    />
                </div>
                <div className='loginInputs'>
                    <label>Сайт с ассортиментом компании</label>
                    <input
                        value={details?.site}
                        onChange={(e) => setDetails({ ...details, site: e.target.value })}
                    />
                </div>
                <div className='loginInputs'>
                    <label>Телеграм канал</label>
                    <input
                        value={details?.telegram}
                        onChange={(e) => setDetails({ ...details, telegram: e.target.value })}
                    />
                </div>
                <div className='eachProfileField loginInputs'>
                    <label>Наличие шоурума</label>
                    <select value='' onChange={(e) => setDetails({ ...details, showroom: e.target.value })}>
                        <option value={true}>Да</option>
                        <option value={false}>Нет</option>
                    </select>
                </div>
                <div className='eachProfileField loginInputs'>
                    <label>Сотрудничаете с дизайнерами?</label>
                    <select value='' onChange={(e) => setDetails({ ...details, designer: e.target.value })}>
                        <option value={true}>Да</option>
                        <option value={false}>Нет</option>
                    </select>
                </div>
                <div className='eachProfileField loginInputs'>
                    <label>Предоставляете 3D модели?</label>
                    <select value='' onChange={(e) => setDetails({ ...details, models: e.target.value })}>
                        <option value={true}>Да</option>
                        <option value={false}>Нет</option>
                    </select>
                </div>
                <div className='loginInputs'>
                    <label>Пароль</label>
                    <div className='loginPaswordInput'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={details?.password}
                            onChange={(e) => setDetails({ ...details, password: e.target.value })}
                            style={(errors.passwordError || loginError) ? { border: '1px solid red' } : {}}
                        />
                        <div onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <ClosedEye /> : <OpenedEye />}
                        </div>
                    </div>
                </div>
                <div className='loginInputs'>
                    <label>Загрузитье аватар/логотип</label>
                    <input
                        type='file'
                    />
                </div>
                <div className='loginButton'>
                    <button onClick={register}>Зарегистрироваться</button>
                </div>
                <div className='loginNoAccount'>
                    <p>Уже зарегистрировались?<span onClick={() => window.location = '/auth/login'}> Войти</span></p>
                </div>
            </div>
        </div>
    )
}