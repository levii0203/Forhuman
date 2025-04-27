import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    code: null,
    previewIs:false,
}

const previewSlice = createSlice({
    name:'preview',
    initialState,
    reducers: {
        setPreviewIs: (state,action)=>{
            state.previewIs = action.payload;
        },
        setCode: (state,action)=>{
            state.code = action.payload;
        }
    }
})

export const { setCode , setPreviewIs } = previewSlice.actions;
export default previewSlice.reducer