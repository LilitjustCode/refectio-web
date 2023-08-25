import './style.css'
import { useState } from 'react'
import { EachProduct } from '../eachProduct'
import { SingleProduct } from '../popup/singleProduct'

export const EachManufacturer = ({ manufacturer }) => {
    const [openSingleProductPopuop, setOpenSingleProductPopup] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    function handleClick(e) {
        setSelectedProduct(e)
        setOpenSingleProductPopup(true)
    }

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
                    <img alt='' src={`${process.env.REACT_APP_IMAGE}${manufacturer.logo}`} />
                    <div className='eachManuTopTitle'>
                        <h2 onClick={() => window.location = `/manufacturer/${manufacturer?.id}`}>{manufacturer?.company_name}</h2>
                        <span>{manufacturer?.made_in}</span>
                    </div>
                </div>

                <div className='eachManuCats'>
                    {manufacturer?.user_category_product?.length && manufacturer?.user_category_product?.map((e, i) => (
                        <div className='eachManuCategory' key={i}>
                            <span>{e?.category_name}</span>
                        </div>
                    ))}
                </div>
                <div className='eachManuProds'>
                    {manufacturer?.user_product_limit1?.length && manufacturer?.user_product_limit1?.map((e, i) => (
                        <EachProduct onClick={() => handleClick(e)} product={e} key={i} />
                    ))}
                </div>
            </div>
        </>
    )
}