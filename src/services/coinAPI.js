export const fetchCryptoData = () => {
    return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
};