import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface orderProduct {
  purchaseId: number;
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
}

const initialState: orderProduct[] = [];
let nextId = 1;

export const basketProductsSlice = createSlice({
  name: 'orderProducts',
  initialState: {orderProduct: initialState},
  reducers: {
    addOrderProduct: (
      state,
      action: PayloadAction<{
        purchaseId: number;
        optionList: [];
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
      }>,
    ) => {
      state.orderProduct.push({
        purchaseId: nextId,
        orderItems: action.payload.optionList,
        existingItems: {
          contentId: action.payload.contentId,
          name: action.payload.name,
          explain: action.payload.explain,
          category: action.payload.category,
          brand: action.payload.brand,
          color: action.payload.color,
          price: action.payload.price,
          size: action.payload.size,
          isChecked: action.payload.isChecked,
          thumbnailList: action.payload.thumbnailList,
          detailList: action.payload.detailList,
        },
      });
      nextId += 1;
    },
  },
});

export const {addOrderProduct} = basketProductsSlice.actions;
export default basketProductsSlice.reducer;
