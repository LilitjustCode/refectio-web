import { FetchGet } from "./fetch"

export const GetAllManufacturers = () => { return FetchGet('/GetAllProduct', 'getAllManufacturers') }
export const GetSingleManufacturer = (id) => {return FetchGet(`/getOneProizvoditel/user_id=${id}`, 'singleManufacturer')}