import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {View, Dimensions, Text} from 'react-native';

function Review() {
  useEffect(() => {
    console.log('Review>>>');
  }, []);
  return (
    <View style={{flex: 1}}>
      <Text>리뷰</Text>
    </View>
  );
}

export default Review;
