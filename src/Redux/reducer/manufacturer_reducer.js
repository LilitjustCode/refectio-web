import store from '../store/manufacturer_store'

export const Manufacturer_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllManufacturers':
            temp.allManufacturers = action.payload.data.data.data
            break;
        default:
            return temp;
    }
    return temp;
}