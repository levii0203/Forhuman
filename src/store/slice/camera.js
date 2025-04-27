import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    on: false,
    take: false,
    image:null,
}


const cameraSlice = createSlice({
    name:'camera',
    initialState,
    reducers: {
        setTake: (state,action)=>{
            state.take = action.payload;
        },
        setOn: (state,action)=>{
            state.on = action.payload;
        },
        setImage: (state,action)=>{
            state.image = action.payload;
        }
    }
})

export const { setTake , setOn, setImage} = cameraSlice.actions;
export default cameraSlice.reducer;