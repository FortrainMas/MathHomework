import {Product} from 'src/entities/Products/productsModel.ts';
import {createSlice} from '@reduxjs/toolkit';
import {
    buyProductThunk,
    getProducts,
    getUserBalanceThunk,
} from 'src/entities/Products/productsThunks.ts';
import {toast} from 'react-toastify';

type initialState = {
    products: Product[];
    status: string;
    balance: number;
};

const initialState: initialState = {
    products: [],
    status: 'idle',
    balance: 0,
};

export const productsSlice = createSlice({
    name: 'products',
    reducers: {
        setProductStatus: (state, action) => {
            // @ts-ignore
            state.products.filter(
                product => product.id === action.payload.id
            )[0].already_bought = true;
        },
    },
    initialState,
    extraReducers: builder => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = 'idle';
        });
        builder.addCase(getProducts.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(getProducts.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(buyProductThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
        builder.addCase(getUserBalanceThunk.fulfilled, (state, action) => {
            state.balance = action.payload;
        });
        builder.addCase(getUserBalanceThunk.rejected, (_, action) => {
            toast.error(action.payload);
        });
    },
});

export default productsSlice.reducer;
export const {setProductStatus} = productsSlice.actions;
