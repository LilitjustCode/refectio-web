import './style.css'

export const EachProduct = ({ product, onClick }) => {
    return (
        <div
            className='eachManuProduct cursor'
            onClick={onClick}
        >
            <img alt='' src={require(`../../assets/${product?.image}`)} />
            <div className='eachManuProdDetails'>
                <p>{product?.title}</p>
                <span>Фасады : {product?.facades}</span>
                <span>Корпус: {product?.body}</span>
                <span>Столешница: {product?.top}</span>
                <span>Длина: {product?.width}</span>
                <span>Цена: {product?.price}</span>
            </div>
        </div>
    )
}