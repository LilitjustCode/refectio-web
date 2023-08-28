import { FetchPost } from './fetch'

export const AuthUser = (login, password) => { return FetchPost('/loginuser', { login, password }, 'login', 'loginError') }
export const Logout = () => { return FetchPost('/UserLogout', { null: null }, 'logout') }