import React, { useEffect } from 'react';

function RunningHeader({ cryptos }) {
    return (
        <div className='main'>
            {Array.isArray(cryptos) && cryptos.map(crypto => (
                <div key={crypto.id}>
                    <h1>{crypto.name}</h1>
                    <p>{crypto.current_price}</p>
                </div>
            ))}
        </div>
    );
}

export default RunningHeader;