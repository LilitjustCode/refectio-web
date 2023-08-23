import './style.css'
import { useState } from 'react'
import { ProfileFields } from '../../components/profileFields'
import { PageNavigation } from '../../components/pageNavigation'

export const MyProfile = () => {

    const [details, setDetails] = useState({
        country: 'Италия',
        code: '7727563778',
        cities: [
            {
                id: 1,
                title: 'Москва'
            },
            {
                id: 2,
                title: 'Ереван'
            },
            {
                id: 3,
                title: 'Москва'
            },
            {
                id: 4,
                title: 'Ереван'
            },
        ],
        selectedCountry: 'Москва',
        description: 'Текст информации',
        name: 'Лайт кухни',
        telegram: 'Линк',
        site: 'Линк',
        phone: '+7 (909) 099-99-99',
        password: '**********',
        categories: [
            {
                id: 1,
                title: 'Москва'
            },
            {
                id: 2,
                title: 'Ереван'
            },
            {
                id: 3,
                title: 'Москва'
            },
            {
                id: 4,
                title: 'Ереван'
            },
        ],
        selectedCategory: 'Кухня'
    })

    return (
        <div className='myProfilePage'>
            <PageNavigation
                backButton={false}
                title={false}
                search={false}
                navigation={[
                    {
                        title: 'Профиль',
                        path: '/profile'
                    }
                ]}
            />
            <div className='profileBlock'>
                <ProfileFields details={details} setDetails={setDetails} />
                <div className='profileButton'>
                    <button onClick={() => window.location = '/myProducts'}>Мои товары</button>
                    <button>Выйти</button>
                </div>
            </div>
        </div>
    )
}