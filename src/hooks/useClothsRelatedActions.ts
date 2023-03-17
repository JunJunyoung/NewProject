import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {toggle, toggleAll} from '../redux/slice/ClothList';
import {bindActionCreators} from '@reduxjs/toolkit';
import {addRecentProduct} from '../redux/slice/RecentProducts';
import {
  addBasketProduct,
  addOverwriteBasketProduct,
  setBasketProduct,
} from '../redux/slice/BasketProducts';
import {addOrderProduct} from '../redux/slice/OrderProducts';

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
          addOverwriteBasketProduct,
          setBasketProduct,
          addOrderProduct,
        },
        dispatch,
      ),
    [dispatch],
  );
}
