import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {toggle, toggleAll} from '../redux/slice/ClothList';
import {bindActionCreators} from '@reduxjs/toolkit';
import {addRecentProduct} from '../redux/slice/RecentProducts';
import {
  addBasketProduct,
  removeSameBasketProduct,
  setSelected,
  addnewBasketProduct,
} from '../redux/slice/BasketProducts';

export default function useClothsRelatedActions() {
  const dispatch = useDispatch();
  return useMemo(
    () =>
      bindActionCreators(
        {
          toggle,
          toggleAll,
          addRecentProduct,
          addBasketProduct,
          removeSameBasketProduct,
          setSelected,
          addnewBasketProduct,
        },
        dispatch,
      ),
    [dispatch],
  );
}
