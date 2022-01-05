import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import userReducer from './Slices/userSlice'
import cartReducer from './Slices/cartSlice'
import appReducer from './Slices/appSlice'
import addressReducer from './Slices/addressSlice'

const reducers = combineReducers({
  user:userReducer,
  cart:cartReducer,
  app:appReducer,
  address:addressReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export default store