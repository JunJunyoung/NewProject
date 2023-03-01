import {configureStore} from '@reduxjs/toolkit';
import ClothList from './slice/ClothList';
import RecentProducts from './slice/RecentProducts';
import BasketProducts from './slice/BasketProducts';

export const store = configureStore({
  reducer: {
    clothList: ClothList,
    recentProduct: RecentProducts,
    basketProduct: BasketProducts,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
