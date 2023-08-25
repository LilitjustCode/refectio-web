import { FetchPost } from './fetch'

export const AuthUser = (login, password) => { return FetchPost('/loginuser', { login, password }, 'login', 'loginError') }