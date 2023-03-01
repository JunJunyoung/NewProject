import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface recentProduct {
  seenContentId: number;
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

// export interface recentProduct extends Array<recentProduct> {}

let nextId = 1;
const initialState: recentProduct[] = [];

export const recentProductsSlice = createSlice({
  name: 'recentProducts',
  initialState,
  reducers: {
    addRecentProduct: (
      state,
      action: PayloadAction<{
        seenContentId: number;
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
      state.unshift({
        seenContentId: nextId,
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
      nextId = +1;
    },
  },
});

export const {addRecentProduct} = recentProductsSlice.actions;
export default recentProductsSlice.reducer;
