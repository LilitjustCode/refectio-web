import store from '../store/myProfile_store'

export const MyProfile_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'myProfile':
            if (action.payload.status) temp.user = action.payload.data[0]
            break;
        case 'updateSuccessful':
            temp.update = false
            break;
        case 'updateSuccess':
            if (action.payload.status) temp.update = true
            break;
        case 'getCities':
            if (action.payload.status) temp.cities = action.payload.data.city
            break;
        case 'getProducts':
            if (action.payload.status) temp.categories = action.payload.data.city
            break;
        case 'updatePassword':
            if (action.payload.status) {
                if (action.payload.data.message.includes('password updated')) {
                    temp.passwordError = ''
                    temp.update = true
                }
            } else {
                if (action.payload.data.message.includes('wrong password')) temp.passwordError = 'Неправильный пароль'
            }
            break;
        case 'clearPasswordErrors':
            temp.passwordError = ''
            break;
        case 'updatePhone':
            if (action.payload.status) {
                temp.openCode = true
            }
            break;
        default:
            return temp;
    }
    return temp;
}