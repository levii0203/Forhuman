import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: false
}

const darkSlice = createSlice({
    name:'dark',
    initialState,
    reducers:{
        toggleDark: (state)=>{
            state.isDark = !state.isDark
        }
    }
})

export const { toggleDark } = darkSlice.actions;
export default darkSlice.reducer;