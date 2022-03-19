import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistReducer, FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST  } from "redux-persist";

import authReducer from "./authReducer";
import appointmentReduer from './appointmentsReducer';

const secretKey = 'VNERYjnvhbre';
const config = {
    key: 'root',
    storage,
    blackList: [],
    transforms: [
        encryptTransform({ secretKey })
    ]
}

const rootReducer = combineReducers({
    auth: authReducer,
    appointment: appointmentReduer
});

const persistRootReducer = persistReducer(config, rootReducer);

export const store = configureStore({
    reducer: persistRootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: { ignoreActions: true},
        immutableCheck: false,
    })
})