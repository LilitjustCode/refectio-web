import store from "../store/auth_store"

export const Auth_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case '':
            break;
        default:
            return temp;
    }
    return temp;
} 