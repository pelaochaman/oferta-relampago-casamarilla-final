import React from 'react';
import ProductState from './context/ProductState';
import Countdown from './pack3';

const ThirdOfertaRelampago = (props) => {
    return (
        <ProductState>
            <Countdown props={ props } />
        </ProductState>
    )
}

export default ThirdOfertaRelampago;