import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface recentProduct {
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
}

const initialState: recentProduct[] = [];
let nextId = 1;

export const recentProductsSlice = createSlice({
  name: 'recentProducts',
  initialState,
  reducers: {
    addRecentProduct: (
      state,
      action: PayloadAction<{
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
      state.unshift({
        contentId: nextId,
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
      });
      nextId += 1;
    },
  },
});

export const {addRecentProduct} = recentProductsSlice.actions;
export default recentProductsSlice.reducer;
