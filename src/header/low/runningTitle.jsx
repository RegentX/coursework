import React, { useEffect, useState } from 'react';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

function RunningHeader() {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        const subscription = interval(20000) // emit value every 20 seconds
            .pipe(
                switchMap(() => fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1')),
                switchMap(response => response.json())
            )
            .subscribe(data => {
                setCryptos(data);
            });

        // cleanup function on component unmount
        return () => subscription.unsubscribe();
    }, []);

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