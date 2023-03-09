import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface basketProduct {
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

const initialState: basketProduct[] = [];
let nextId = 1;

export const basketProductsSlice = createSlice({
  name: 'basketProducts',
  initialState: {basketProduct: initialState},
  reducers: {
    addBasketProduct: (
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
      state.basketProduct.push({
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
    addOverwriteBasketProduct: (
      state,
      action: PayloadAction<{
        newOptionList: [];
        contentId: number;
      }>,
    ) => {
      state.basketProduct = state.basketProduct.map(item => {
        if (item.existingItems.contentId === action.payload.contentId) {
          return {...item, orderItems: action.payload.newOptionList};
        } else {
          return item;
        }
      });
    },
    isSelectedChangedProduct: (state, action: PayloadAction<[]>) => {
      state.basketProduct = action.payload;
    },
  },
});

export const {
  addBasketProduct,
  addOverwriteBasketProduct,
  isSelectedChangedProduct,
} = basketProductsSlice.actions;
export default basketProductsSlice.reducer;
