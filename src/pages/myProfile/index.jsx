import './style.css'
import { ProfileFields } from '../../components/profileFields'
import { PageNavigation } from '../../components/pageNavigation'

export const MyProfile = () => {
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
                <ProfileFields />
                <div className='profileButton'>
                    <button onClick={() => window.location = '/myProducts'}>Мои товары</button>
                    <button>Выйти</button>
                </div>
            </div>
        </div>
    )
}