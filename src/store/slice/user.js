import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_premium: false
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        toggleIs_premium: (state)=>{
            state.is_premium = !state.is_premium;
        }
    }
})

export const { toggleIs_premium } = userSlice.actions;
export default userSlice.reducer;