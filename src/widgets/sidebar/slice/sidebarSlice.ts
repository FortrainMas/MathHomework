import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0,
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {

    }
})


export default sidebarSlice.reducer