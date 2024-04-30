import { useEffect, useState } from 'react';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

export default CryptoDropdown;