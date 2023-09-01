import './style.css'

export const EachProduct = ({ product, onClick }) => {
    return (
        <div className='eachManuProduct cursor' onClick={onClick}>
            <img alt='' src={`${process.env.REACT_APP_IMAGE}${product?.product_image[0]?.image}`} />
            <div className='eachManuProdDetails'>
                <p>{product?.title ? product?.title : product?.name}</p>
                <span>Фасады : {product?.facades}</span>
                <span>Корпус: {product?.frame}</span>
                <span>Столешница: {product?.tabletop}</span>
                <span>Длина: {product?.length} м.</span>
                <span>Цена: {product?.price}</span>
            </div>
        </div>
    )
}