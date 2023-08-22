import './style.css'
import { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { OpenedEye, ClosedEye } from '../../components/svg'

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='loginPage'>
            <div className='loginBlock'>
                <div className='loginTitle'>
                    <h1>Вход</h1>
                    <span>Регистрация</span>
                </div>
                <div className='loginInputs'>
                    <label>Номер телефона</label>
                    <ReactInputMask mask="+7 (999) 999-99-99" maskChar="_" />
                </div>
                <div className='loginInputs'>
                    <label>Пароль</label>
                    <div className='loginPaswordInput'>
                        <input type={showPassword ? 'text' : 'password'} />
                        <div onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <ClosedEye /> : <OpenedEye />}
                        </div>
                    </div>
                </div>
                <div className='loginForgotPassword'>
                    <span>Забыли пароль?</span>
                </div>
                <div className='loginButton'>
                    <button>Войти</button>
                </div>
                <div className='loginNoAccount'>
                    <p>Нет аккаунта?<span> Зарегистрироваться</span></p>
                </div>
            </div>
        </div>
    )
}