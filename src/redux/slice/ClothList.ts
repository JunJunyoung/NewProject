import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import storage from '../../static/storage.json';

export const clothListSlice = createSlice({
  name: 'clothList',
  initialState: {clothList: storage},
  reducers: {
    toggle: (state, action: PayloadAction<number>) => {
      state.clothList = state.clothList.map(item => {
        if (item.contentId === action.payload) {
          return {...item, isChecked: !item.isChecked};
        } else {
          return item;
        }
      });
    },
    toggleAll: state => {
      state.clothList = state.clothList.map(item => {
        if (item.isChecked === true) {
          return {...item, isChecked: !item.isChecked};
        } else {
          return item;
        }
      });
    },
  },
});

export const {toggle, toggleAll} = clothListSlice.actions;
export default clothListSlice.reducer;
