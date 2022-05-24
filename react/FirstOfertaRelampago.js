import React from 'react';
import ProductState from './context/ProductState';
import Countdown from './pack1';

const FirstOfertaRelampago = (props) => {
    return (
        <ProductState>
            <Countdown props={ props } />
        </ProductState>
    )
}

export default FirstOfertaRelampago;
