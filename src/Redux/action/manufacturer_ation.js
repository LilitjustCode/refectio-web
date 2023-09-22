import { FetchGet, FetchPost } from "./fetch"

export const GetAllManufacturers = (page) => { return FetchGet(`/GetAllProduct?page=${page}`, 'getAllManufacturers') }
export const GetSingleManufacturer = (id) => { return FetchGet(`/getOneProizvoditel/user_id=${id}`, 'singleManufacturer') }
export const SearchManufacturers = (company_name) => { return FetchPost('/searchProizvoditel', { company_name }, 'search', 'searchError') }
export const FilterCategories = (parent_category_name, user_id) => { return FetchPost('/filtergetOneProizvoditel', { parent_category_name, user_id }, 'filterManuCategories') }