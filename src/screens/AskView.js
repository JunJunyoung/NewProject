import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {View, Dimensions, Text} from 'react-native';
import {exp} from 'react-native-reanimated';

function AskView() {
  useEffect(() => {
    console.log('AskView>>>');
  }, []);
  return (
    <View style={{flex: 1}}>
      <Text>문의</Text>
    </View>
  );
}

export default AskView;
