import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    product: [],
    cartCount: 0
}

const productSlice = createSlice({
    name:'product',
    initialState: initialState,
    reducers:{
        
        product:(state, actions) => {
            state.product = actions.payload
        },

        addCart:(state, actions) => {
            state.cartCount = state.cartCount + actions.payload
        }
    }
})

export const productReducer = productSlice.reducer;

export const actions = productSlice.actions