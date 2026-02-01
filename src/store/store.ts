import { configureStore } from '@reduxjs/toolkit';
import resourcesReducer from './resourcesSlice';
import glossaryReducer from './glossarySlice';
import languageReducer from './languageSlice';

export const store = configureStore({
  reducer: {
    resources: resourcesReducer,
    glossary: glossaryReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
