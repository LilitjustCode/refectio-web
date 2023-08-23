import './style.css'
// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { EachProduct } from '../../components/eachProduct'
import { PageNavigation } from '../../components/pageNavigation'

export const SingleManufacturer = () => {
    // const products = useSelector(st => st.Product_reducer.products)
    // const [openSingleProductPopuop, setOpenSingleProductPopup] = useState(false)
    // const [selectedProduct, setSelectedProduct] = useState(null)

    // function handleClick(e) {
    //     setSelectedProduct(e)
    //     setOpenSingleProductPopup(true)
    // }

    return (<>
        {/* {openSingleProductPopuop &&
            <SingleProduct
                open={openSingleProductPopuop}
                setOpen={setOpenSingleProductPopup}
                product={selectedProduct}
            />
        } */}
        <div className='singleManuPage'>
            <PageNavigation
                backButton={true}
                title={'Все производители'}
                search={false}
            />

            <div className='singleManuBlock'>

            </div>

            <div className='singleManuBlock'>
                <div className='singleManuFilter'>

                </div>
                <div className='singleManuProducts'>
                    {/* {products.length > 0
                        ? products.map((e, i) => (
                            <EachProduct onClick={handleClick} product={e} key={i} />
                        ))
                        : ''
                    } */}
                </div>
            </div>
        </div>
    </>)
}