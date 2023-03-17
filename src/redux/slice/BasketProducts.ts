import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface clothItem {
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

export interface basketProduct {
  purchaseId: number;
  orderItems: [];
  existingItems: clothItem;
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
        optionList: [];
        clothItem: clothItem;
      }>,
    ) => {
      const {optionList, clothItem} = action.payload;
      state.basketProduct.push({
        purchaseId: nextId,
        orderItems: optionList,
        existingItems: clothItem,
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
    setBasketProduct: (state, action: PayloadAction<[]>) => {
      state.basketProduct = action.payload;
    },
  },
});

export const {addBasketProduct, addOverwriteBasketProduct, setBasketProduct} =
  basketProductsSlice.actions;
export default basketProductsSlice.reducer;
