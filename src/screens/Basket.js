import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BasketItem from '../components/BasketItem';
import {ScrollView} from 'react-native-gesture-handler';
import useClothsRelatedActions from '../hooks/useClothsRelatedActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Window_WIDTH = Dimensions.get('window').width;

const Basket = () => {
  const orderedProduct = useSelector(state => state.orderProduct.orderProduct);
  const clothList = useSelector(state => state.clothList.clothList);
  const basketProduct = useSelector(state => state.basketProduct.basketProduct);
  const [checkboxState, setCheckboxState] = useState(false);
  const {isSelectedChangedProduct, addOrderProduct} = useClothsRelatedActions();
  const allIsSelectedTrueProduct = useMemo(
    () =>
      basketProduct.map(item => {
        const newOne = item.orderItems.map(c =>
          c.isSelected === false ? {...c, isSelected: true} : c,
        );
        return {...item, orderItems: newOne};
      }),
    [basketProduct],
  );
  const allIsSelectedFalseProduct = useMemo(
    () =>
      basketProduct.map(item => {
        const newOne = item.orderItems.map(c =>
          c.isSelected === true ? {...c, isSelected: false} : c,
        );
        return {...item, orderItems: newOne};
      }),
    [basketProduct],
  );
  const SelectedItemsDeleteArr = useMemo(
    () =>
      basketProduct.filter(item => {
        if (item.orderItems.every(c => c.isSelected === false) === true) {
          return {item};
        }
      }),
    [basketProduct],
  );
  const SelectedItemsArr = useMemo(
    () =>
      basketProduct.filter(item => {
        if (item.orderItems.every(c => c.isSelected === true) === true) {
          return {item};
        }
      }),
    [basketProduct],
  );
  const idNameChangeSelectedItemsArr = useMemo(
    () =>
      SelectedItemsArr.map(({purchaseId: orderId, ...item}) => ({
        orderId,
        ...item,
      })),
    [SelectedItemsArr],
  );
  let today = new Date();
  let time = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    hours: today.getHours(),
    minutes: today.getMinutes(),
  };

  const timeAddedroduct = useMemo(
    () =>
      idNameChangeSelectedItemsArr.map(item => ({
        ...item,
        orderTime: '',
      })),
    [idNameChangeSelectedItemsArr],
  );
  const orderProduct = useMemo(
    () =>
      timeAddedroduct.map(item => {
        return {...item, orderTime: time};
      }),
    [timeAddedroduct],
  );

  useEffect(() => {
    async function save() {
      try {
        await AsyncStorage.setItem(
          'orderProduct',
          JSON.stringify(orderProduct),
        );
      } catch (e) {
        console.log('Fail to save orderProduct');
      }
    }
    save();
  }, [orderProduct]);

  const deleteIsSelected = () => {
    Alert.alert(
      '삭제',
      '선택하신 상품을 삭제하시겠습니까?',
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            isSelectedChangedProduct(SelectedItemsDeleteArr);
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

  const sameOrderProductItem = orderedProduct?.find(item => {
    const sameSelectedItemsArr = SelectedItemsArr?.filter(
      c => c.existingItems.contentId === item.existingItems.contentId,
    );
    if (sameSelectedItemsArr) {
      return item;
    } else {
      null;
    }
  });

  const sameClothListItems = clothList.filter(item => {
    const test =
      sameOrderProductItem?.existingItems?.contentId === item.contentId;
    if (test) {
      return item;
    } else {
      null;
    }
  });

  const sameOrderProductAndClothListObj =
    sameOrderProductItem?.orderItems?.find(item => {
      const test1 = sameClothListItems.find(e => {
        const depth = e.color.find(f => f.label === item.orderColor);
        if (depth) {
          return e;
        }
      });
      const test2 = sameClothListItems.find(r => {
        const depths = r.size.find(g => g.label === item.orderSize);
        if (depths) {
          return r;
        }
      });
      if (test1 && test2) {
        return item;
      }
    });

  const SelectedOrderItems = SelectedItemsArr?.find(item => {
    const e = item?.orderItems?.find(
      e =>
        e?.orderColor === sameOrderProductAndClothListObj?.orderColor &&
        e?.orderSize === sameOrderProductAndClothListObj?.orderSize,
    );
    if (e) {
      return item;
    }
  });

  const SelectedOrderItemObj = SelectedOrderItems?.orderItems?.find(
    item =>
      item.orderColor === sameOrderProductAndClothListObj.orderColor &&
      item.orderSize === sameOrderProductAndClothListObj.orderSize,
  );

  const sameClothListItemsObj = sameClothListItems.find(item => {
    const condition1 = item.color.find(
      f => f.label === sameOrderProductAndClothListObj.orderColor,
    );
    const condition2 = item.size.find(
      g => g.label === sameOrderProductAndClothListObj.orderSize,
    );
    if (condition1 && condition2) {
      return item;
    }
  });

  const sameClothListItemsCountObj = sameClothListItemsObj?.size?.find(item =>
    item.label === SelectedOrderItemObj?.orderSize ? item.count : null,
  );

  console.log(
    'sameOrderProductAndClothListObj>>>',
    sameOrderProductAndClothListObj,
  );
  console.log('SelectedOrderItemObj>>>', SelectedOrderItemObj);
  console.log('sameClothListItemsCountObj>>>', sameClothListItemsCountObj);

  const purchaseCompleted = () => {
    if (
      sameOrderProductAndClothListObj?.quantity +
        SelectedOrderItemObj?.quantity >
      sameClothListItemsCountObj?.count
    ) {
      Alert.alert('죄송합니다. 재고가 부족합니다.');
    } else {
      Alert.alert(
        '주문 완료',
        '주문이 완료되었습니다.',
        [{text: '계속 쇼핑하기', onPress: () => {}, style: 'cancel'}],
        {
          cancelable: false,
        },
      );
      addOrderProduct(orderProduct);
      isSelectedChangedProduct(SelectedItemsDeleteArr);
    }
  };

  const IsSelectedProduct = basketProduct.filter(
    item => item.orderItems.filter(c => c.isSelected === true).length,
  ).length;

  const selectedProductPrice = basketProduct.reduce(
    (acc, item) =>
      acc +
      item.orderItems.reduce(
        (ac, i) => (i.isSelected === true ? ac + i.price * i.quantity : 0),
        0,
      ),
    0,
  );

  const totalPrice = selectedProductPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
          <DeleteButton onPress={() => deleteIsSelected()}>
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
          <Text style={{color: 'black', fontSize: 15}}>
            {IsSelectedProduct}
          </Text>
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
            {totalPrice} 원
          </Text>
        </View>
      </CalculatedView>
      <BottomBuynView>
        <BuyButton onPress={() => purchaseCompleted()}>
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

export default Basket;
