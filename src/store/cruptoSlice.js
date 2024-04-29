import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { from } from 'rxjs';
import { interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

// export const fetchCryptoData = createAsyncThunk('crypto/fetchData', () => {
//     return from(fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1')
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error('Error:', error)))
//         .pipe(
//             switchMap(response => from(response.json())),
//             map(data => data)
//         );
// });

export const fetchCryptoData = createAsyncThunk('crypto/fetchData', () => {
    return interval(20000) // emit value every 20 seconds
        .pipe(
            switchMap(() => from(fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1'))),
            switchMap(response => from(response.json())),
            map(data => data)
        ).toPromise();
});

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCryptoData.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchCryptoData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCryptoData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default cryptoSlice.reducer;