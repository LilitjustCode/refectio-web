import './style.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CloseIcon } from '../../svg'
import ReactInputMask from 'react-input-mask'
import { UpdatePhone } from '../../../Redux/action/myProfile_action'

export const EditPhone = ({ open, setOpen, phone }) => {
    const dispatch = useDispatch()
    const openCode = useSelector(st => st.MyProfile_reducer.openCode)
    const [phoneNumber, setPhoneNumber] = useState(phone)
    const [error, setError] = useState('')

    useEffect(() => {
        if(openCode) {
            // bacel code-i ejy
        }
    }, [openCode])

    function close() {
        setOpen(false)
    }

    function save() {
        if (!phoneNumber || phoneNumber.includes('_')) {
            setError('Обязательное поле')
        } else {
            setError('')
            dispatch(UpdatePhone(phoneNumber))
        }
    }

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '670px' }}>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                <h1 className='passowrdTitle'>Изменить номер телефона</h1>
                <div className='loginInputs'>
                    <label>Номер телефона</label>
                    <ReactInputMask
                        mask="+7 (999) 999-99-99"
                        maskChar="_"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={error ? { border: '1px solid red' } : {}}
                        onKeyDown={(e) => e.key === 'Enter' && save()}
                    />
                    {error.length > 0 && <span className='loginError'>{error}</span>}
                </div>
                <div className='loginButton'>
                    <button onClick={save}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}