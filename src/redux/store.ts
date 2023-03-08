import {configureStore} from '@reduxjs/toolkit';
import ClothList from './slice/ClothList';
import RecentProducts from './slice/RecentProducts';
import BasketProducts from './slice/BasketProducts';
import OrderProducts from './slice/OrderProducts';

export const store = configureStore({
  reducer: {
    clothList: ClothList,
    recentProduct: RecentProducts,
    basketProduct: BasketProducts,
    orderProduct: OrderProducts,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
