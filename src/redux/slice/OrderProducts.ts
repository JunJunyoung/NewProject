import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface orderProduct {
  orderId: number;
  orderItems: [];
  existingItems: {
    contentId: number;
    name: string;
    explain: string;
    category: string;
    brand: string;
    color: [];
    price: number;
    size: [];
    isChecked: boolean;
    thumbnailList: [];
    detailList: [];
  };
  orderTime: {
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
  };
}

const initialState: orderProduct[] = [];

export const basketProductsSlice = createSlice({
  name: 'orderProducts',
  initialState: {orderProduct: initialState},
  reducers: {
    addOrderProduct: (state, action: PayloadAction<[]>) => {
      state.orderProduct = action.payload;
    },
  },
});

export const {addOrderProduct} = basketProductsSlice.actions;
export default basketProductsSlice.reducer;
