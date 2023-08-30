import store from '../store/manufacturer_store'

export const Manufacturer_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllManufacturers':
            temp.allManufacturers = action.payload.data.data.data
            break;
        case 'singleManufacturer':
            if (action.payload.status) {
                temp.singleManufacturerUser = action.payload.data.user[0]
                temp.singleManufacturerCategories = action.payload.data?.user_category_for_product
                temp.singleManufacturerCities = action.payload.data?.city_for_sales_user
                temp.singleManufacturerProducts = action.payload.data?.products
            } else {
                window.location = '/'
            }
            break;
        default:
            return temp;
    }
    return temp;
}