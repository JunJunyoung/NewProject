import {configureStore} from '@reduxjs/toolkit';
import ClothList from './ClothList';

export const store = configureStore({
  reducer: {
    clothList: ClothList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
