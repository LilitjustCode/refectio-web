import './style.css'
import { useEffect } from 'react'
import { CloseIcon } from '../../svg'

export const MoreInfo = ({ open, setOpen, product }) => {

    useEffect(() => {
        document.querySelector('.mainLayout').style.position = 'fixed'
    }, [])

    function close() {
        document.querySelector('.mainLayout').style.position = 'relative'
        setOpen(false)
    }

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop'>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                <div className='moreInfoPopup' dangerouslySetInnerHTML={{ __html: product?.about }} />
            </div>
        </div>
    )
}