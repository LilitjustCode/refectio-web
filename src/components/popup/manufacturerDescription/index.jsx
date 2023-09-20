import { CloseIcon } from '../../svg'

export const ManufacturerDescription = ({ open, setOpen, description }) => {
    
    function close() {
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