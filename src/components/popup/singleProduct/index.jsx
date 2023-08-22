import './style.css'
import { CloseIcon } from '../../svg'
import { Carousel } from 'react-carousel-minimal'

export const SingleProduct = ({ open, setOpen, product }) => {

    const data = [
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
        },
        {
            image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
        },
        {
            image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
        },
        {
            image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
        },
        {
            image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
        },
        {
            image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
        },
        {
            image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
        },
        {
            image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
        }
    ]

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
                        radius="10px"
                        dots={true}
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                    />
                </div>
                <div className='eachSingleProdDetails'>
                    <div className='eachManuProduct'>
                        <div className='eachManuProdDetails'>
                            <p>{product?.title}</p>
                            <span>Фасады : {product?.facades}</span>
                            <span>Корпус: {product?.body}</span>
                            <span>Столешница: {product?.top}</span>
                            <span>Длина: {product?.width}</span>
                            <span>Цена: {product?.price}</span>
                            <span>{product?.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}