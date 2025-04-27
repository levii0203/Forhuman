import { createSlice } from "@reduxjs/toolkit";


const initialState= {
    userPrompt: null,
    promptResponse: [],
    download:[],
    refresh: null,
    sent:false,
    next:false,
    create:false,
    createIs:null,
    model:null,
    load:true,
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers: {
        setUserPrompt: (state,action)=>{
            state.userPrompt = action.payload;
        },
        setRefresh: (state,action)=>{
            state.refresh = action.payload;
        },
        addPrompt: (state,action)=>{
            state.promptResponse.push(action.payload);
        },
        setDownload: (state,action)=>{
            state.download = action.payload
        },
        addDownload: (state,action)=>{
            state.download.push(action.payload);
        },
        allDownloadFalse: (state)=>{
            let copy = [...state.download];
            for(let i=0;i<state.download.length;i++){
                copy[i] = false;
            }
           state.download = copy;

        },
        setSent: (state,action)=>{
            state.sent = action.payload;
        },
        setNext: (state,action)=>{
            state.next = action.payload;
        },
        setCreate:(state,action)=>{
            state.create = action.payload
        },
        setCreateIs: (state,action)=>{
            state.createIs = action.payload;
        },
        setModel: (state,action)=>{
            state.model = action.payload
        },
        setLoad: (state,action)=>{
            state.load = action.payload;
        },
    }
})

export const { setUserPrompt , setRefresh , addPrompt , setDownload , addDownload , allDownloadFalse, setSent, setNext , setCreate , setCreateIs , setModel , setLoad } = chatSlice.actions;
export default chatSlice.reducer;