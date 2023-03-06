import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {toggle, toggleAll} from '../redux/slice/ClothList';
import {bindActionCreators} from '@reduxjs/toolkit';
import {addRecentProduct} from '../redux/slice/RecentProducts';
import {
  addBasketProduct,
  setSelected,
  addOverwriteBasketProduct,
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
          setSelected,
          addOverwriteBasketProduct,
        },
        dispatch,
      ),
    [dispatch],
  );
}
