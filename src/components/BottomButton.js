import React from 'react';
import {View, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Octicons';

const Window_WIDTH = Dimensions.get('window').width;

function BottomButton({isChecked, contentId}) {
  <BottomButtonView>
    {/* <View style={{height: 50, width: 50}}>
      {isChecked === false ? (
        <WantButton onPress={() => toggle(contentId)} activeOpacity={0.9}>
          <Icon name="heart" size={40} color="black" />
        </WantButton>
      ) : (
        <WantButton onPress={() => toggle(contentId)} activeOpacity={0.9}>
          <Icon name="heart-fill" size={40} color="#f66" />
        </WantButton>
      )}
    </View>
    <View style={{height: 50, width: 150}}>
      <BuyButton title="구매하기" />
    </View> */}
  </BottomButtonView>;
}

const BottomButtonView = styled.View`
  position: absolute;
  background-color: yellow;
  flex-direction: row;
  justify-content: space-between;
  bottom: 0;
  height: 60px;
  width: ${Window_WIDTH}px;
`;

const BuyButton = styled.Button`
  color: tomato;
`;

const WantButton = styled.TouchableOpacity`
  color: red;
`;

export default BottomButton;
