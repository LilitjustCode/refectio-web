import store from "../store/auth_store"

export const Auth_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'login':
            if (action.payload.status) {
                if (action.payload?.message?.message?.includes('login succsesfuli')) {
                    localStorage.setItem('token', action.payload?.message?.token)
                    temp.user = action.payload.message.user
                    localStorage.setItem('userId', action.payload.message.user.id)
                    window.location = '/'
                }
            } else {
                if (action.payload?.message?.message?.includes('user does not exist')) {
                    temp.loginError = 'Неправильный номер телефона или пароль'
                }
            }
            break;
        case 'logout':
            localStorage.clear()
            window.location.reload()
            break;
        default:
            return temp;
    }
    return temp;
} 