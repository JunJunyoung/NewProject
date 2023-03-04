import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface basketProduct {
  purchaseId: number;
  isSelected: Boolean;
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
    thumnailList: [];
    detailList: [];
  };
}

const initialState: basketProduct[] = [];
let nextId = 1;

export const basketProductsSlice = createSlice({
  name: 'basketProducts',
  initialState,
  reducers: {
    addBasketProduct: (
      state,
      action: PayloadAction<{
        purchaseId: number;
        isSelected: Boolean;
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
        thumnailList: [];
        detailList: [];
      }>,
    ) => {
      state.push({
        purchaseId: nextId,
        isSelected: false,
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
          thumnailList: action.payload.thumnailList,
          detailList: action.payload.detailList,
        },
      });
      nextId += 1;
    },
    addnewBasketProduct: (
      state,
      action: PayloadAction<{
        purchaseId: number;
        isSelected: Boolean;
        newOptionList: [];
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
        purchaseId: nextId,
        isSelected: false,
        orderItems: action.payload.newOptionList,
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
          thumnailList: action.payload.thumnailList,
          detailList: action.payload.detailList,
        },
      });
      nextId += 1;
    },
    removeSameBasketProduct: (state, action: PayloadAction<number>) => {
      state = state.filter(
        item => item.existingItems.contentId !== action.payload,
      );
    },
    setSelected: (state, action: PayloadAction<number>) => {
      state = state.map(item => {
        if (item.purchaseId === action.payload) {
          return {...item, isSelected: !item.isSelected};
        } else {
          return item;
        }
      });
    },
  },
});

export const {
  addBasketProduct,
  addnewBasketProduct,
  setSelected,
  removeSameBasketProduct,
} = basketProductsSlice.actions;
export default basketProductsSlice.reducer;
