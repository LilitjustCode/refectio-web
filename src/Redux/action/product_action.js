import { FetchGet, FetchPost } from "./fetch"

export const AllMyProducts = () => { return FetchGet(`/getOneProizvoditel/user_id=${localStorage.getItem('userId')}`, 'myProducts') }
export const DeleteProduct = (product_id) => { return FetchPost('/deleteAuthUserProduct', { product_id }, 'update') }
export const UpdateSuccess = () => { return { type: 'updateSuccess' } }
export const CreateProduct = (data) => { return FetchPost('/createnewproductProizvoditel', { data }, 'createProduct') }