import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import storage from '../static/storage.json';

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
  },
});

export const {toggle} = clothListSlice.actions;
export default clothListSlice.reducer;

// add: (
//   state,
//   action: PayloadAction<{
//     picture: string;
//     title: string;
//     content: string;
//   }>,
// ) => {
//   console.log('state>>>', state);
//   console.log('action>>>', action);
//   state.push({
//     contentId: nextId,
//     ...action.payload,
//     isChecked: false,
//   });
//   nextId = +1;
// },
// remove: state => {
//   state = state.filter(item => item.isChecked === false);
// },
