import './style.css'

export const EachProduct = ({ product, onClick }) => {
    const path = window.location.pathname.includes('/manufacturer/') ? `${product?.image}` : `${product?.product_image[0]?.image}`

    return (
        <div
            className='eachManuProduct cursor'
            onClick={onClick}
        >
            <img alt='' src={`${process.env.REACT_APP_IMAGE}${path}`} />
            <div className='eachManuProdDetails'>
                <p>{product?.title}</p>
                <span>Фасады : {product?.facades}</span>
                <span>Корпус: {product?.frame}</span>
                <span>Столешница: {product?.tabletop}</span>
                <span>Длина: {product?.length}</span>
                <span>Цена: {product?.price}</span>
            </div>
        </div>
    )
}