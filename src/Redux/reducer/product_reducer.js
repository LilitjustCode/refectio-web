import store from "../store/product_store"

export const Product_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case '':
            break;
        default:
            return temp;
    }
    return temp;
}