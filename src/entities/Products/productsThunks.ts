import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError, AxiosResponse} from 'axios';
import {
    buyProduct,
    loadStoreList,
    loadUserStoreBalance,
} from 'src/shared/api/ApiCalls.ts';
import {BackendError} from 'src/app/types/global.ts';
import {getErrorMessage} from 'src/shared/utils/api';
import {Product} from 'src/entities/Products/productsModel.ts';
import {setProductStatus} from 'src/entities/Products/productsSlice.ts';
import {toast} from 'react-toastify';

export const getProducts = createAsyncThunk<
    Product[],
    void,
    {rejectValue: string}
>('products/getProducts', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{
            products: Product[];
        }> = await loadStoreList();

        return res.data.products;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const buyProductThunk = createAsyncThunk<
    void,
    {id: number},
    {rejectValue: string}
>('products/buyProduct', async (data, {rejectWithValue, dispatch}) => {
    try {
        await buyProduct(data);

        dispatch(setProductStatus({id: data.id}));
        toast.success('Успешно куплено');
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});

export const getUserBalanceThunk = createAsyncThunk<
    number,
    void,
    {rejectValue: string}
>('products/getUserBalanceThunk', async (_, {rejectWithValue}) => {
    try {
        const res: AxiosResponse<{balance: number}> =
            await loadUserStoreBalance();

        return res.data.balance;
    } catch (e: unknown | AxiosError<BackendError>) {
        return rejectWithValue(getErrorMessage(e));
    }
});
