import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BasketItem from '../components/BasketItem';
import {ScrollView} from 'react-native-gesture-handler';
import useClothsRelatedActions from '../hooks/useClothsRelatedActions';

const Window_WIDTH = Dimensions.get('window').width;

const Order = () => {
  const basketProduct = useSelector(state => state.orderProduct.orderProduct);
  const [checkboxState, setCheckboxState] = useState(false);
  const {isSelectedChangedProduct} = useClothsRelatedActions();
  const allIsSelectedTrueProduct = basketProduct.map(item => {
    const newOne = item.orderItems.map(c =>
      c.isSelected === false ? {...c, isSelected: true} : c,
    );
    return {...item, orderItems: newOne};
  });
  const allIsSelectedFalseProduct = basketProduct.map(item => {
    const newOne = item.orderItems.map(c =>
      c.isSelected === true ? {...c, isSelected: false} : c,
    );
    return {...item, orderItems: newOne};
  });

  const deleteIsChecked = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠습니까?',
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            toggleAll();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  // const totalQuantity = basketProduct.reduce(
  //   (acc, item) => acc + item.quantity,
  //   0,
  // );
  // const totalCalculatedPrice = totalQuantity * price;
  // const totalPrice = totalCalculatedPrice
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <TopView>
          <View style={{flexDirection: 'row', marginLeft: 15}}>
            {checkboxState === false ? (
              <BouncyCheckbox
                size={22}
                iconStyle={{
                  borderRadius: 0,
                  borderColor: '#f66',
                }}
                innerIconStyle={{
                  borderRadius: 0,
                  borderWidth: 2.5,
                  borderColor: 'gray',
                }}
                fillColor="#f66"
                isChecked={checkboxState}
                onPress={() => {
                  isSelectedChangedProduct(allIsSelectedTrueProduct);
                  setCheckboxState(!checkboxState);
                }}
                disableText={true}
              />
            ) : (
              <BouncyCheckbox
                size={22}
                iconStyle={{
                  borderRadius: 0,
                  borderColor: '#f66',
                }}
                innerIconStyle={{
                  borderRadius: 0,
                  borderWidth: 2.5,
                  borderColor: '#f66',
                }}
                fillColor="#f66"
                isChecked={checkboxState}
                onPress={() => {
                  isSelectedChangedProduct(allIsSelectedFalseProduct);
                  setCheckboxState(!checkboxState);
                }}
                disableText={true}
              />
            )}
            <SelectedText>전체 선택</SelectedText>
          </View>
          <DeleteButton onPress={() => deleteIsChecked()}>
            <DeleteText style={{textAlign: 'right', fontWeight: 'bold'}}>
              선택 삭제
            </DeleteText>
          </DeleteButton>
        </TopView>
        <BasketInfoContainer>
          <BasketInfoView>
            {basketProduct.map(item => {
              const {purchaseId, isSelected, orderItems, existingItems} = item;
              return (
                <BasketItemWrapper key={purchaseId}>
                  <BasketItem
                    purchaseId={purchaseId}
                    isSelected={isSelected}
                    orderItems={orderItems}
                    existingItems={existingItems}
                  />
                </BasketItemWrapper>
              );
            })}
          </BasketInfoView>
        </BasketInfoContainer>
        <View style={{height: 80}} />
      </ScrollView>
      <CalculatedView>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <Text style={{color: 'black'}}>totalQuantity</Text>
          <Text> 개 선택</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginRight: 20,
          }}>
          <Text
            style={{
              textAlignVertical: 'bottom',
              fontSize: 18,
              color: 'black',
            }}>
            총 {''}
          </Text>
          <Text
            style={{
              textAlignVertical: 'top',
              fontSize: 25,
              fontWeight: 'bold',
              color: 'red',
            }}>
            totalPrice 원
          </Text>
        </View>
      </CalculatedView>
      <BottomBuynView>
        <BuyButton>
          <BuyText>주문하기</BuyText>
        </BuyButton>
      </BottomBuynView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const TopView = styled.View`
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
`;

const SelectedText = styled.Text`
  font-size: 18px;
  text-align: left;
  margin-top: 5px;
  margin-left: 12px;
  color: gray;
`;

const DeleteButton = styled.TouchableOpacity`
  height: 40px;
  width: 80px;
  margin-top: 12px;
  margin-right: 7px;
`;

const DeleteText = styled.Text`
  font-size: 14px;
  text-align: left;
  margin-top: 12px;
  margin-right: 13px;
  color: black;
`;

const BasketInfoContainer = styled.View`
  margin-top: 8px;
`;

const BasketItemWrapper = styled.View`
  padding-vertical: 4px;
`;

const BasketInfoView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const BottomBuynView = styled.View`
  position: absolute;
  background-color: white;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  height: 80px;
  border-width: 1px;
  border-color: #e0e0e0;
  width: ${Window_WIDTH}px;
`;

const BuyButton = styled.TouchableOpacity`
  background-color: black;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 90%;
  border-radius: 7px;
  border-width: 1px;
  border-color: #e0e0e0;
`;

const BuyText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: white;
  padding-bottom: 7px;
`;

const CalculatedView = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  bottom: 60px;
  border-width: 1px;
  border-color: #e0e0e0;
  width: ${Window_WIDTH}px;
`;

export default Order;
