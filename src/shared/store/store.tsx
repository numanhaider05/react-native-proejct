import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import userReducer from './reducers/userReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
declare var window: any;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const reducers = combineReducers({
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware: any = getDefaultMiddleware({ serializableCheck: false });

let enhancedCompose = compose;

if (__DEV__) {
  enhancedCompose = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
}

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: enhancedCompose(middleware),
});

export type RootState = ReturnType<typeof store.getState>
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
