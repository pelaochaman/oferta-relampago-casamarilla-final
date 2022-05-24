export default (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                productContext: payload
            }
        case 'SET_PRODUCT':
            return {
                ...state,
                productSelected: payload
            }
        default:
            return {
                ...state
            }
    }
}