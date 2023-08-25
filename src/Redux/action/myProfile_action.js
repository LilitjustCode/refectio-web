import { FetchGet, FetchPost } from "./fetch"

export const MyProfile = () => { return FetchGet('/AuthUserProfile', 'myProfile') }
export const UpdateSuccessful = () => { return { type: 'updateSuccessful' } }
export const UpdateCountry = (made_in) => { return FetchPost('/updateManeInProizvoditel', { made_in }, 'updateCountry') }
export const UpdateCode = (individual_number) => { return FetchPost('/UpdateIndividualNumberProizvoditel', { individual_number }, 'updateCode') }
export const UpdateName = (company_name) => { return FetchPost('/updateProfileCompanyName', { company_name }, 'updateName') }
export const UpdateTelegram = (telegram) => { return FetchPost('/UpdateTelegramChanel', { telegram }, 'updateTelegram') }
export const UpdateSite = (saite) => { return FetchPost('/updateSaiteProizvaditel', { saite }, 'updateSite') }