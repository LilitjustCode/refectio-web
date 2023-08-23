import './style.css'
import { useState } from 'react'
import { EachProduct } from '../eachProduct'
import { SingleProduct } from '../popup/singleProduct'

export const EachManufacturer = ({ manufacturers }) => {
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
                    <img alt='' src={require(`../../assets/${manufacturers?.avatar}`)} />
                    <div className='eachManuTopTitle'>
                        <h2 onClick={() => window.location = `/manufacturer/${manufacturers?.id}`}>{manufacturers?.name}</h2>
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
                        <EachProduct onClick={handleClick} product={e} key={i} />
                    ))}
                </div>
            </div>
        </>
    )
}