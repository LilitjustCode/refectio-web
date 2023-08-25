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
        case 'updateCountry':
            if (action.payload.status) temp.update = true
            break;
        case 'updateCode':
            if (action.payload.status) temp.update = true
            break;
        case 'updateName':
            if (action.payload.status) temp.update = true
            break;
        case 'updateTelegram':
            if (action.payload.status) temp.update = true
            break;
        case 'updateSite':
            if (action.payload.status) temp.update = true
            break;
        default:
            return temp;
    }
    return temp;
}