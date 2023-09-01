import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageNavigation } from '../../components/pageNavigation'
import { EachManufacturer } from '../../components/eachManufacturer'
import { GetAllManufacturers } from '../../Redux/action/manufacturer_ation'
import { AllManufacturersSkeleton } from '../../components/skeletons/allManufacturers'

export const AllManufacturers = () => {
    const dispatch = useDispatch()
    const manufacturers = useSelector(st => st.Manufacturer_reducer.allManufacturers)
    const searchManufacturers = useSelector(st => st.Manufacturer_reducer.search)
    const [searchText, setSearchText] = useState('')

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
                searchText={searchText}
                setSearchText={setSearchText}
            />
            {manufacturers?.length
                ? <div className='allManufacturers'>
                    {searchText?.length > 0 && searchManufacturers?.length > 0
                        ? searchManufacturers?.map((e, i) => (
                            <EachManufacturer manufacturer={e} key={i} />
                        ))
                        : manufacturers?.length > 0
                            ? manufacturers.map((e, i) => (
                                <EachManufacturer manufacturer={e} key={i} />
                            ))
                            : <span>Нет производителей</span>
                    }
                </div>
                : <AllManufacturersSkeleton />
            }
        </div>
    )
}