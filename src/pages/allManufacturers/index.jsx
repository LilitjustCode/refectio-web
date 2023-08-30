import './style.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageNavigation } from '../../components/pageNavigation'
import { EachManufacturer } from '../../components/eachManufacturer'
import { GetAllManufacturers } from '../../Redux/action/manufacturer_ation'

export const AllManufacturers = () => {
    const dispatch = useDispatch()
    const manufacturers = useSelector(st => st.Manufacturer_reducer.allManufacturers)

    useEffect(() => {
        dispatch(GetAllManufacturers())
    }, [dispatch])

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
                        <EachManufacturer manufacturer={e} key={i} />
                    ))
                    : <span>Нет производителей</span>
                }
            </div>
        </div>
    )
}