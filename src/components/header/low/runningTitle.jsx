import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import React, { useEffect, useState } from 'react';

function RunningHeader({ apiUrl, refreshInterval }) {
    const [cryptos, setCryptos] = useState([]);

    function CryptoDropdown({ apiUrl, refreshInterval, onCryptoSelect }) {
        const [cryptos, setCryptos] = useState([]);

        useEffect(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setCryptos(data.data.slice(0, 5));
                })
                .catch(error => console.error('Error:', error));
        }, []);

        useEffect(() => {
            const subscription = interval(refreshInterval)
                .pipe(
                    switchMap(() => fetch(apiUrl)),
                    switchMap(response => response.json())
                )
                .subscribe(data => {
                    setCryptos(data.data.slice(0, 5));
                });

            return () => subscription.unsubscribe();
        }, [apiUrl, refreshInterval]);

        const handleSelectChange = (event) => {
            const selectedCrypto = cryptos.find(crypto => crypto.id === event.target.value);
            onCryptoSelect(selectedCrypto);
        };

        return (
            <select onChange={handleSelectChange}>
                {cryptos.map(crypto => (
                    <option key={crypto.id} value={crypto.id}>
                        {crypto.name} - {crypto.priceUsd}
                    </option>
                ))}
            </select>
        );
    }

    useEffect(() => {
        const subscription = interval(refreshInterval)
            .pipe(
                switchMap(() => fetch(apiUrl)),
                switchMap(response => response.json())
            )
            .subscribe(data => {
                setCryptos(data.data.slice(0, 5));
            });

        return () => subscription.unsubscribe();
    }, [apiUrl, refreshInterval]);

    return (
        <div className='main'>
            {Array.isArray(cryptos) && cryptos.map(crypto => (
                <div id='elem' key={crypto.id}>
                    <h1>{crypto.name}</h1>
                    <p>{crypto.priceUsd}</p>
                </div>
            ))}
        </div>
    );
}

export default RunningHeader