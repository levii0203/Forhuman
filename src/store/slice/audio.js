import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    audioUrls:[],
    audioUrl:null
}

const audioSlice = createSlice({
    name:'audio',
    initialState,
    reducers: {
        setAudioUrl: (state,action)=>{
            state.audioUrl = action.payload
        },
        setAudioUrls: (state,action)=>{
            state.audioUrls = action.payload
        }
    }
})

export const { setAudioUrl , setAudioUrls} = audioSlice.actions;
export default audioSlice.reducer;