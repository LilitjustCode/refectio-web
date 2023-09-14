import './style.css'

export const EachProduct = ({ product, onClick, width, divWidth }) => {
    return (
        <div className='eachManuProduct cursor' onClick={onClick} style={{width: divWidth}}>
            <img alt='' src={`${process.env.REACT_APP_IMAGE}${product?.product_image[0]?.image}`} style={{ width }} />
            <div className='eachManuProdDetails'>
                <p>{product?.title ? product?.title : product?.name}</p>
                {product?.facades && <span>Фасады: {product?.facades}</span>}
                {product?.frame && <span>Корпус: {product?.frame}</span>}
                {product?.tabletop && <span>Столешница: {product?.tabletop}</span>}
                {product?.length && <span>Длина: {product?.length} м.</span>}
                {product?.height && <span>Высота: {product?.height} м.</span>}
                {product?.price && <span>Цена: {product?.price}</span>}
                {product?.about && <span className='about' dangerouslySetInnerHTML={{ __html: `Доп. информация: ${product?.about}` }} />}
            </div>
        </div>
    )
}