import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import useClothsRelatedActions from '../hooks/useClothsRelatedActions';
import Counter from './Counter';
import Icon from 'react-native-vector-icons/AntDesign';

const Window_WIDTH = Dimensions.get('window').width;

const PurchaseModal = props => {
  const {
    contentId,
    optionList,
    setOptionList,
    purchaseVisible,
    setPurchaseVisible,
    setOptionVisible,
  } = props;
  const {addBasketProduct, closeModal} = useClothsRelatedActions();
  const clothList = useSelector(state => state.clothList.clothList);
  const clickedClothList = clothList.find(item => item.contentId === contentId);
  const {
    name,
    explain,
    category,
    brand,
    color,
    price,
    size,
    isChecked,
    thumbnailList,
    detailList,
  } = clickedClothList;
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetPurchaseModal = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closePurchaseModal = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          setCloseModal();
        } else {
          resetPurchaseModal.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (props.purchaseVisible) {
      resetPurchaseModal.start();
    }
  }, [props.purchaseVisible]);

  const setCloseModal = () => {
    closePurchaseModal.start(() => setPurchaseVisible(false));
  };
  const setValidator = () => {
    addBasketProduct({
      orderId,
      orderColor,
      orderSize,
      contentId,
      name,
      explain,
      category,
      brand,
      color,
      price,
      size,
      isChecked,
      thumbnailList,
      detailList,
    });
    setPurchaseVisible(false);
  };

  useEffect(() => {
    console.log('optionList>>>', optionList);
  }, [optionList]);

  const totalQuantity = optionList.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const totalCalculatedPrice = totalQuantity * price;
  const totalPrice = totalCalculatedPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Modal
      visible={purchaseVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
      propagateSwipe={true}>
      <OverlayView>
        <TouchableWithoutFeedback onPress={() => setPurchaseVisible(false)}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            height: 500,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
              <CloseButton
                style={{marginTop: 20}}
                onPress={() => {
                  setOptionVisible(true);
                }}>
                <CloseText>옵션 선택하기</CloseText>
              </CloseButton>
              <OptionView optionList={optionList}>
                <ClothView>
                  {optionList.map((item, id) => {
                    const {
                      orderId,
                      orderColor,
                      orderSize,
                      price,
                      quantity,
                      remainInventory,
                    } = item;
                    return (
                      <OptionListView key={id}>
                        <View style={{marginTop: 8, marginLeft: 10}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              orderColor={orderColor}
                              orderSize={orderSize}
                              style={{
                                color: 'black',
                                fontSize: 17,
                                fontWeight: 'bold',
                              }}>
                              {orderColor} / {orderSize}
                            </Text>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setOptionList(
                                  optionList.filter(
                                    item =>
                                      item.orderColor !== orderColor ||
                                      item.orderSize !== orderSize,
                                  ),
                                );
                              }}>
                              <Icon
                                name="closecircleo"
                                size={22}
                                style={{marginRight: 12}}
                              />
                            </TouchableWithoutFeedback>
                          </View>
                          <Text
                            style={{
                              marginTop: 12,
                              marginBottom: 12,
                              fontWeight: 'bold',
                              color: '#A0A0A0',
                            }}>
                            일반배송
                          </Text>
                        </View>
                        <View>
                          <Counter
                            orderId={orderId}
                            price={price}
                            remainInventory={remainInventory}
                            quantity={quantity}
                            optionList={optionList}
                            setOptionList={setOptionList}
                          />
                        </View>
                      </OptionListView>
                    );
                  })}
                </ClothView>
              </OptionView>
            </Container>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 80,
              height: 1,
              width: '100%',
              backgroundColor: '#E0E0E0',
            }}
          />
          <CalculatedView>
            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <Text style={{color: 'black'}}>{totalQuantity}</Text>
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
                  fontSize: 23,
                  fontWeight: 'bold',
                  color: 'red',
                }}>
                {totalPrice} 원
              </Text>
            </View>
          </CalculatedView>
          <BottomOptionView>
            <BasketButton onPress={setValidator}>
              <BasketText>장바구니 담기</BasketText>
            </BasketButton>
          </BottomOptionView>
        </Animated.View>
      </OverlayView>
    </Modal>
  );
};

const OverlayView = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2000;
`;

const BottomOptionView = styled.View`
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

const Container = styled.View`
  align-items: center;
  width: ${Window_WIDTH}px;
`;

const CalculatedView = styled.View`
  position: absolute;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  bottom: 80px;
  height: 70px;
  border-width: 1px;
  border-color: #e0e0e0;
  width: ${Window_WIDTH}px;
`;

const OptionView = styled.View`
  background-color: white;
  margin-top: 8px;
  height: ${({optionList}) => optionList.length * 195}px;
  border-radius: 7px;
  width: 95%;
`;

const ClothView = styled.View`
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 5px;
`;

const OptionListView = styled.View`
  width: ${Window_WIDTH * 0.95}px;
  border-width: 2px;
  border-radius: 7px;
  border-color: #e0e0e0;
  margin-top: 10px;
`;

const CloseButton = styled.TouchableOpacity`
  background-color: white;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 95%;
  border-radius: 7px;
  border-width: 2px;
  border-color: #e0e0e0;
`;

const CloseText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: black;
  padding-bottom: 7px;
`;

const BasketButton = styled.TouchableOpacity`
  background-color: black;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 90%;
  border-radius: 7px;
  border-width: 1px;
  border-color: #e0e0e0;
`;

const BasketText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: white;
  padding-bottom: 7px;
`;

export default PurchaseModal;
