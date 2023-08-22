import './style.css'
import { useSelector } from 'react-redux'
import { PageNavigation } from '../../components/pageNavigation'
import { EachManufacturer } from '../../components/eachManufacturer'

export const AllManufacturers = () => {
    const manufacturers = useSelector(st => st.Product_reducer.manufacturers)

    return (
        <div className='allManufacturersPage'>
            <PageNavigation
                backButton={false}
                title={'Производители'}
                navigation={false}
                search={true}
            />
            <div className='allManufacturers'>
                {manufacturers?.length > 0
                    ? manufacturers.map((e, i) => (
                        <EachManufacturer manufacturers={e} key={i} />
                    ))
                    : <span>Нет производителей</span>
                }
            </div>
        </div>
    )
}