import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { userSlice } from './user/user-slice';
import sessionStorage from 'redux-persist/es/storage/session';
import { creatorSlice } from './creatorAccount/creator-slice';
import { socketFuelSlice } from './fuel/fuel-slice';

const persistConfig = {
  key: 'atemu',
  storage: sessionStorage,
  version: 1,
  whitelist: ['user', 'prevConnector', 'creatorAccount'],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  creatorAccount: creatorSlice.reducer,
  socketFuel: socketFuelSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;
