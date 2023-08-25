import { FetchGet, FetchPost } from "./fetch"

export const GetAllManufacturers = () => { return FetchGet('/GetAllProduct', 'getAllManufacturers') }