import store from "../store/product_store"

export const Product_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'myProducts':
            if (action.payload.status) temp.myProducts = action.payload.data.products
            break;
        case 'update':
            console.log(action.payload);
            if (action.payload?.status) temp.update = true
            break;
        case 'updateSuccess':
            temp.update = false
            break;
        case 'createProduct':
            console.log(action.payload);
            break;
        default:
            return temp;
    }
    return temp;
}