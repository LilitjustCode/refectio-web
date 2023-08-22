import './style.css'
import { BackButton, Search } from '../svg'

export const PageNavigation = ({ title, backButton, navigation, search }) => {
    return (
        <div className='pageTitle' style={navigation ? { justifyContent: 'flex-start' } : {}}>
            {title &&
                <div className='pageNavTitle'>
                    <div className='backBtn'>
                        {backButton && <BackButton />}
                    </div>
                    <h1>{title}</h1>
                </div>
            }
            <div className='pageNavigation'>
                {navigation && navigation.map((e, i) => (
                    <div className='eachNavigation' key={i}>
                        <p
                            style={i === navigation.length - 1 ? { color: '#333' } : { color: '#afafaf' }}
                            onClick={() => window.location = e?.path}
                        >
                            {e?.title}
                        </p>
                    </div>
                ))}
            </div>
            {search &&
                <div className='pageSearch'>
                    <input placeholder='Поиск...' />
                    <div className='pageSearchBg'>
                        <Search />
                    </div>
                </div>
            }
        </div>
    )
}