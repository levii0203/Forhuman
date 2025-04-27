import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    is:false
}

const siderbarSlice = createSlice({
    name:'sidebar',
    initialState,
    reducers: {
        setSidebar: (state,action)=>{
            state.is = action.payload
        },
        toggleSidebar: (state)=>{
            state.is = !state.is
        }
    }
})

export const {setSidebar , toggleSidebar} = siderbarSlice.actions;
export default siderbarSlice.reducer
