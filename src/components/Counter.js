import React, {useState, useEffect} from 'react';
import {Text, View, Alert} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Counter = ({
  orderId,
  price,
  remainInventory,
  quantity,
  optionList,
  setOptionList,
}) => {
  const [count, setCount] = useState(1);
  const onIncrease = () => {
    count >= remainInventory
      ? Alert.alert('재고가 부족합니다')
      : (setCount(prevCount => prevCount + 1),
        setOptionList(
          optionList.map(item =>
            item.orderId === orderId ? {...item, quantity: quantity + 1} : item,
          ),
        ));
  };

  const onDecrease = () => {
    setCount(prevCount => prevCount - 1);
    setOptionList(
      optionList.map(item =>
        item.orderId === orderId ? {...item, quantity: quantity - 1} : item,
      ),
    );
  };
  const newPrice = price * quantity;
  const multipliedPrice = newPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <View style={{marginLeft: 9}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          marginBottom: 10,
          marginRight: 12,
        }}>
        <View style={{flexDirection: 'row'}}>
          {quantity > 1 ? (
            <CounterButton onPress={onDecrease} color="white">
              <Icon name="minus" size={30} color="#606060" />
            </CounterButton>
          ) : (
            <CounterButton color="gray" disabled={false}>
              <Icon name="minus" size={30} color="#606060" />
            </CounterButton>
          )}
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
              marginHorizontal: 10,
            }}>
            {quantity}
          </Text>
          <CounterButton onPress={onIncrease} color="white">
            <Icon name="plus" size={30} color="#606060" />
          </CounterButton>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          {multipliedPrice}원
        </Text>
      </View>
    </View>
  );
};

const CounterButton = styled.TouchableOpacity`
  height: 34px;
  width: 34px;
  border-radius: 17px;
  border-color: #e0e0e0;
  border-width: 1px;
`;

export default Counter;
