import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {toggle, toggleAll} from '../redux/ClothList';
import {bindActionCreators} from '@reduxjs/toolkit';

export default function useClothsRelatedActions() {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({toggle, toggleAll}, dispatch),
    [dispatch],
  );
}
