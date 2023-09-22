import './style.css'
import { CloseIcon } from '../../svg'

export const MoreInfo = ({ open, setOpen, product }) => {
    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop'>
                <div className='close' onClick={() => setOpen(false)}>
                    <CloseIcon />
                </div>
                <div className='moreInfoPopup' dangerouslySetInnerHTML={{ __html: product?.about }} />
            </div>
        </div>
    )
}