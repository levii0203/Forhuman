
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './slice/sidebar';
import chatReducer from './slice/chat'
import darkReducer from './slice/dark'
import userReducer from './slice/user'
import cameraReducer from './slice/camera'
import imagesReducer from './slice/images'
import previewReducer from './slice/preview'
import audioReducer from './slice/audio'

const store = configureStore({
    reducer:{
        sidebar: sidebarReducer,
        chat: chatReducer,
        dark: darkReducer,
        user: userReducer,
        camera: cameraReducer,
        images: imagesReducer,
        preview: previewReducer,
        audio: audioReducer
    }
})

export default store;