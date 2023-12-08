import userSlice from "../pages/userSlice";
import searchUserSlice from "../pages/searchUserSlice";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers} from "redux"
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

const reducers = combineReducers({
    user: userSlice,
    search: searchUserSlice
})

const persistConfig = {
    key : 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig , reducers)

export default configureStore({
    reducer :persistedReducer,
    middleware:[thunk]
})