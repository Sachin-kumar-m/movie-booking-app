import userSlice from "./userSlice"
import loaderSlice from "./loaderSlice"

import {configureStore} from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        users: userSlice,
        loaders: loaderSlice
    }
})

export default store