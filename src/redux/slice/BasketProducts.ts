import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface basketProduct {
  orderId: number;
  orderColor: string;
  orderSize: string;
  contentId: number;
  name: string;
  explain: string;
  category: string;
  brand: string;
  color: [];
  price: number;
  size: [];
  isChecked: boolean;
  thumnailList: [];
  detailList: [];
}

// BasketProducts = [
//   {orderItems: {orderId: 1, orderColor: red, orderSize: L}},
//   {existingItems: {contentId:1, brand: wetsdf, ...}}
//   ]

let nextId = 1;
const initialState: basketProduct[] = [];

export const basketProductsSlice = createSlice({
  name: 'basketProducts',
  initialState,
  reducers: {
    addBasketProduct: (
      state,
      action: PayloadAction<{
        orderId: number;
        orderColor: string;
        orderSize: string;
        contentId: number;
        name: string;
        explain: string;
        category: string;
        brand: string;
        color: [];
        price: number;
        size: [];
        isChecked: boolean;
        thumnailList: [];
        detailList: [];
      }>,
    ) => {
      state.push({
        orderId: action.payload.orderId,
        orderColor: action.payload.orderColor,
        orderSize: action.payload.orderSize,
        contentId: action.payload.contentId,
        name: action.payload.name,
        explain: action.payload.explain,
        category: action.payload.category,
        brand: action.payload.brand,
        color: action.payload.color,
        price: action.payload.price,
        size: action.payload.size,
        isChecked: action.payload.isChecked,
        thumnailList: action.payload.thumnailList,
        detailList: action.payload.detailList,
      });
    },
  },
});

export const {addBasketProduct} = basketProductsSlice.actions;
export default basketProductsSlice.reducer;
