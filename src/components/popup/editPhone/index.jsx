import { CloseIcon } from '../../svg'
import { useState, useEffect } from 'react'
import ReactInputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { ClearPhoneError, CloseCode, PhoneCode, UpdatePhone, UpdatePhoneCode, UpdateSuccessful } from '../../../Redux/action/myProfile_action'

export const EditPhone = ({ open, setOpen }) => {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const phoneToken = useSelector(st => st.MyProfile_reducer.phoneToken)
    const phoneError = useSelector(st => st.MyProfile_reducer.phoneError)
    // const codeError = useSelector(st => st.MyProfile_reducer.codeError)
    const update = useSelector(st => st.MyProfile_reducer.update)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')
    const [openCodePage, setOpenCodePage] = useState(false)
    const [code, setCode] = useState('')

    useEffect(() => {
        if (phoneToken) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`)
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            }
            fetch(`${process.env.REACT_APP_HOSTNAME}/updateCodeIntestTable`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status) {
                        setError('')
                        setOpenCodePage(true)
                        dispatch(PhoneCode())
                    } else {
                        setError('Этот номер телефона уже зарегистрирован')
                    }
                })
                .catch(() => {
                    setError('Что-то пошло не так. Пожалуйста, повторите попытку позже')
                })
        }
    }, [phoneToken, update, token, dispatch])

    useEffect(() => {
        if (phoneError) {
            setError(phoneError)
        } else {
            setError('')
            dispatch(ClearPhoneError())
        }
    }, [phoneError, dispatch])

    // useEffect(() => {
    //     if (codeError) {
    //         setError(codeError)
    //     } else {
    //         setError('')
    //     }
    // }, [codeError])

    // useEffect(() => {
    //     if (update) {
    //         window.location.reload()
    //     }
    // }, [update])

    function close() {
        setOpenCodePage(false)
        setPhoneNumber('')
        setError('')
        setOpen(false)
    }

    function savePhone() {
        if (!phoneNumber || phoneNumber.includes('_')) {
            setError('Обязательное поле')
        } else {
            setError('')
            dispatch(UpdatePhone(phoneNumber))
        }
    }

    function saveCode() {
        if (!code.length || code.length < 4) {
            setError('Обязательное поле')
        } else {
            setError('')
            dispatch(PhoneCode(code))
        }
    }

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '670px' }}>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                {openCodePage ? <h1 className='passowrdTitle'>Введите код подтверждения</h1> : <h1 className='passowrdTitle'>Введите новый номер телефона</h1>}
                {openCodePage
                    ? <>
                        <div className='loginInputs'>
                            <input
                                type='number'
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={error ? { border: '1px solid red' } : {}}
                                onKeyDown={(e) => e.key === 'Enter' && saveCode()}
                            />
                            {error.length > 0 && <span className='loginError'>{error}</span>}
                        </div>
                        <div className='loginButton'>
                            <button onClick={saveCode}>Отправить</button>
                        </div>
                    </>
                    : <>
                        <div className='loginInputs'>
                            <label>Номер телефона</label>
                            <ReactInputMask
                                mask="+7 (999) 999-99-99"
                                maskChar="_"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                style={error ? { border: '1px solid red' } : {}}
                                onKeyDown={(e) => e.key === 'Enter' && savePhone()}
                            />
                            {error.length > 0 && <span className='loginError'>{error}</span>}
                        </div>
                        <div className='loginButton'>
                            <button onClick={savePhone}>Изменить</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}