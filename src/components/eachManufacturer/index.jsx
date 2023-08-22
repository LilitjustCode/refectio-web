import './style.css'
import { useState } from 'react'
import { SingleProduct } from '../popup/singleProduct'

export const EachManufacturer = ({ manufacturers }) => {
    const [openSingleProductPopuop, setOpenSingleProductPopup] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    return (
        <>
            {openSingleProductPopuop &&
                <SingleProduct
                    open={openSingleProductPopuop}
                    setOpen={setOpenSingleProductPopup}
                    product={selectedProduct}
                />
            }
            <div className='eachManufacturer'>
                <div className='eachManuTop'>
                    <img alt='' src={require(`../../assets/${manufacturers?.avatar}`)} />
                    <div className='eachManuTopTitle'>
                        <h2>{manufacturers?.name}</h2>
                        <span>{manufacturers?.location}</span>
                    </div>
                </div>

                <div className='eachManuCats'>
                    {manufacturers?.categories?.length && manufacturers?.categories?.map((e, i) => (
                        <div className='eachManuCategory' key={i}>
                            <span>{e?.name}</span>
                        </div>
                    ))}
                </div>

                <div className='eachManuProds'>
                    {manufacturers?.products?.length && manufacturers?.products?.map((e, i) => (
                        <div
                            key={i}
                            className='eachManuProduct cursor'
                            onClick={() => {
                                setSelectedProduct(e)
                                setOpenSingleProductPopup(true)
                            }}
                        >
                            <img alt='' src={require(`../../assets/${e?.image}`)} />
                            <div className='eachManuProdDetails'>
                                <p>{e?.title}</p>
                                <span>Фасады : {e?.facades}</span>
                                <span>Корпус: {e?.body}</span>
                                <span>Столешница: {e?.top}</span>
                                <span>Длина: {e?.width}</span>
                                <span>Цена: {e?.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}