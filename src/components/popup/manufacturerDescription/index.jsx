import { useEffect } from 'react'
import { CloseIcon } from '../../svg'

export const ManufacturerDescription = ({ open, setOpen, description }) => {

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
                {description ? <div dangerouslySetInnerHTML={{ __html: description }} /> : <span className='notFound'>У данного производителя нет доп. информации</span>}
            </div>
        </div>
    )
}