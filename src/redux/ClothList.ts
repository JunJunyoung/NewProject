import {
  createSlice,
  PayloadAction,
  createSelector,
  Store,
} from '@reduxjs/toolkit';
import {create} from 'react-test-renderer';
import storage from '../static/storage.json';
import {RootState} from './store';

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

// export const isCheckedSelector = (state: RootState) : boolean =>
//  state.clothList.clothList.isChecked;

//  const isCheckedItemSelector = createSelector(
//   isCheckedSelector,
//   (isChecked) => {state.clothList.clothList.map(item => {item.isChecked === true ? item : null})}
// );

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
