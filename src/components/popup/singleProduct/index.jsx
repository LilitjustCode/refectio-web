import './style.css'
import { CloseIcon } from '../../svg'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-carousel-minimal'

export const SingleProduct = ({ open, setOpen, product }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        let photos = []
        product?.product_image?.forEach(elm => {
            photos.push({ image: `${process.env.REACT_APP_IMAGE}${elm.image}` })
        })
        setData(photos)
    }, [product?.product_image])

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={window.matchMedia("(max-width: 1240px)").matches ? { width: '670px' } : { width: '970px' }}>
                <div className='close' onClick={() => setOpen(false)}>
                    <CloseIcon />
                </div>
                <div className='eachSingleProdDetails'>
                    <Carousel
                        data={data}
                        width={'100%'}
                        height="500px"
                        dots={true}
                        slideImageFit="fill"
                    />
                </div>
                <div className='eachSingleProdDetails'>
                    <div className='eachManuProduct'>
                        <div className='eachManuProdDetails'>
                            <p>{product?.name}</p>
                            {product?.facades && <span>Фасады: {product?.facades}</span>}
                            {product?.frame && <span>Корпус: {product?.frame}</span>}
                            {product?.tabletop && <span>Столешница: {product?.tabletop}</span>}
                            {product?.length && <span>Длина: {product?.length} м.</span>}
                            {product?.height && <span>Высота: {product?.height} м.</span>}
                            {product?.price && <span>Цена: {product?.price}</span>}
                            {product?.about && <span className='about' dangerouslySetInnerHTML={{ __html: `Доп. информация: ${product?.about}` }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}