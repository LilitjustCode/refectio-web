import './style.css'
import { CloseIcon } from '../../svg'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

export const SingleProduct = ({ open, setOpen, product }) => {
    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop'>
                <div className='close' onClick={() => setOpen(false)}>
                    <CloseIcon />
                </div>
                {/* <div className='eachSingleProdDetails'> */}
                    <Carousel
                        style={styles}
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={product?.product_image?.length !== 1}
                    >
                        {product?.product_image?.length > 0 && product?.product_image?.map((e, i) => (
                            <img alt='' key={i} src={`${process.env.REACT_APP_IMAGE}${e.image}`} className='carouselImages' />
                        ))}
                    </Carousel>
                {/* </div> */}
                {/* <div className='eachSingleProdDetails'>
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
                </div> */}
            </div>
        </div>
    )
}