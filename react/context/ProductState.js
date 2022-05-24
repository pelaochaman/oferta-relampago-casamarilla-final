import React, { useReducer } from 'react';
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import axios from 'axios';

const initialState = {
    productContext: [],
    productSelected: {}
}

const ProductState = (props) => {

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const setProducts = async payload => {
        const products = [];
        const result = await axios.get(`/api/catalog_system/pub/products/search?fq=productClusterIds:${payload}`);
        const { data } = result;
        data.forEach(element => {
            products.push({
                sku: element.productId,
                precioReal: element.items[0].sellers[0].commertialOffer.ListPrice,
                nombre: element.productName,
                precio: element.items[0].sellers[0].commertialOffer.Price,
                link: element.link,
                imagen: element.items[0].images[0].imageUrl,
                desc: Math.trunc(((element.items[0].sellers[0].commertialOffer.ListPrice - element.items[0].sellers[0].commertialOffer.Price) * 100) / element.items[0].sellers[0].commertialOffer.ListPrice),
                items: element.items
              })
        });
        dispatch({
            type: 'SET_PRODUCTS',
            payload: products
        })
    }

    return (
        <ProductContext.Provider value={{
            productContext: state.productContext,
            productSelected: state.productSelected,
            setProducts
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;