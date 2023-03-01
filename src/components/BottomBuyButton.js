import React, {useState, useRef} from 'react';
import {View, Dimensions, Button} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Octicons';
import useClothsRelatedActions from '../hooks/useClothsRelatedActions';
import PurchaseModal from './PurchaseModal';
import SelectOptionModal from './SelectOptionModal';

const Window_WIDTH = Dimensions.get('window').width;

function BottomBuyButton({isChecked, contentId, price}) {
  const {toggle} = useClothsRelatedActions();
  const [optionList, setOptionList] = useState([]);
  const [optionVisible, setOptionVisible] = useState(false);
  const [purchaseVisible, setPurchaseVisible] = useState(false);
  const nextId = useRef(1);

  return (
    <BottomButtonView>
      <View style={{height: 40, width: 50}}>
        {isChecked === false ? (
          <WantButton onPress={() => toggle(contentId)} activeOpacity={0.9}>
            <Icon name="heart" size={40} color="#f66" />
          </WantButton>
        ) : (
          <WantButton onPress={() => toggle(contentId)} activeOpacity={0.9}>
            <Icon name="heart-fill" size={40} color="#f66" />
          </WantButton>
        )}
      </View>
      {optionList.length === 0 ? (
        <BuyButton onPress={() => setOptionVisible(true)}>
          <BuyText>구매하기</BuyText>
          <SelectOptionModal
            contentId={contentId}
            nextId={nextId}
            optionList={optionList}
            setOptionList={setOptionList}
            optionVisible={optionVisible}
            setOptionVisible={setOptionVisible}
            setPurchaseVisible={setPurchaseVisible}
          />
        </BuyButton>
      ) : (
        <BuyButton onPress={() => setPurchaseVisible(true)}>
          <BuyText>구매하기</BuyText>
          <PurchaseModal
            contentId={contentId}
            optionList={optionList}
            setOptionList={setOptionList}
            purchaseVisible={purchaseVisible}
            setPurchaseVisible={setPurchaseVisible}
            setOptionVisible={setOptionVisible}
          />
          <SelectOptionModal
            contentId={contentId}
            nextId={nextId}
            optionList={optionList}
            setOptionList={setOptionList}
            optionVisible={optionVisible}
            setOptionVisible={setOptionVisible}
            setPurchaseVisible={setPurchaseVisible}
          />
        </BuyButton>
      )}
    </BottomButtonView>
  );
}

const BottomButtonView = styled.View`
  position: absolute;
  background-color: white;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  height: 80px;
  width: ${Window_WIDTH}px;
`;

const BuyButton = styled.TouchableOpacity`
  background-color: black;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 260px;
  border-radius: 7px;
`;

const BuyText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: white;
  padding-bottom: 7px;
`;

const WantButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export default BottomBuyButton;
