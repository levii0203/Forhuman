import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const initialState = {
    all:[]
}

const imagesSlice = createSlice({
    name:'images',
    initialState,
    reducers:{
        addToImages: (state,action)=>{
            state.all.push(action.payload);
            console.log(action.payload);
        },
        deleteImage: (state,action)=>{
            state.all = state.all.filter((_, index) => index !== action.payload);
        },
    }
})

export const { addToImages , deleteImage} = imagesSlice.actions;
export default imagesSlice.reducer;