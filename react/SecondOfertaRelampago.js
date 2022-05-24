import React from 'react';
import ProductState from './context/ProductState';
import Countdown from './pack2';

const SecondOfertaRelampago = (props) => {
    return (
        <ProductState>
            <Countdown props={ props } />
        </ProductState>
    )
}

export default SecondOfertaRelampago;