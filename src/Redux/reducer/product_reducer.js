import store from "../store/product_store"

export const Product_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'myProducts':
            if (action.payload.status) temp.myProducts = action.payload.data.products
            break;
        case 'deleteProduct':
            if (action.payload?.status) temp.update = new Date()
            break;
        default:
            return temp;
    }
    return temp;
}