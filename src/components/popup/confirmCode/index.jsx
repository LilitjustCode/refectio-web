import { CloseIcon } from '../../svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { SendCall, VerifyCode } from '../../../Redux/action/auth_action'

export const ConfirmCode = ({ open, setOpen, token }) => {
    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState('')
    const codeErrorBack = useSelector(st => st.Auth_reducer.codeError)

    useEffect(() => {
        document.querySelector('.mainLayout').style.position = 'fixed'
        dispatch(SendCall(token))
    }, [dispatch, token])

    function confirm() {
        if (!code?.length) {
            setCodeError('Обязательное поле')
        } else if (code?.length < 4) {
            setCodeError('Код должен содержать 4 символа')
        } else {
            setCodeError('')
            dispatch(VerifyCode(code, token))
        }
    }

    function close() {
        document.querySelector('.mainLayout').style.position = 'relative'
        setOpen(false)
    }

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '400px' }}>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                <div className='loginInputs'>
                    <label>Код подтверждения</label>
                    <input
                        type={'number'}
                        value={code}
                        onChange={(e) => e.target.value.length < 5 && setCode(e.target.value)}
                        style={(codeError.length > 0 || codeErrorBack.length > 0) ? { border: '1px solid red' } : {}}
                    />
                    {codeError && <span className='errorMessage'>{codeError}</span>}
                    {codeErrorBack && <span className='errorMessage'>{codeErrorBack}</span>}
                </div>
                <div className='loginButton'>
                    <button onClick={confirm}>Подтвердить</button>
                </div>
            </div>
        </div>
    )
}