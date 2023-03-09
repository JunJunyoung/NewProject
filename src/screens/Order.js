import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import OrderItem from '../components/OrderItem';

const Window_WIDTH = Dimensions.get('window').width;

const Order = () => {
  const orderProduct = useSelector(state => state.orderProduct.orderProduct);

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}>
        <View
          style={{
            borderBottomColor: '#E0E0E0',
            borderBottomWidth: 2,
          }}
        />
        <TopView>
          <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 18, color: 'gray'}}>배송중</Text>
            <Text
              style={{
                fontSize: 28,
                color: 'black',
                marginLeft: 16,
              }}>
              0
            </Text>
          </View>
          <View
            style={{
              borderRightColor: '#E0E0E0',
              borderRightWidth: 1,
            }}
          />
          <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 18, color: 'gray'}}>배송완료</Text>
            <Text style={{fontSize: 28, color: 'black', marginLeft: 20}}>
              0
            </Text>
          </View>
          <View
            style={{
              borderRightColor: '#E0E0E0',
              borderRightWidth: 1,
            }}
          />
          <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 18, color: 'gray'}}>취소 / 반품</Text>
            <Text style={{fontSize: 28, color: 'black', marginLeft: 25}}>
              0
            </Text>
          </View>
        </TopView>
        <OrderInfoContainer>
          <OrderInfoView>
            {orderProduct.map(item => {
              const {orderId, orderItems, existingItems, orderTime} = item;
              return (
                <OrderItemWrapper key={orderId}>
                  <OrderItem
                    orderId={orderId}
                    orderTime={orderTime}
                    orderItems={orderItems}
                    existingItems={existingItems}
                  />
                </OrderItemWrapper>
              );
            })}
          </OrderInfoView>
        </OrderInfoContainer>
        <View style={{height: 80}} />
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const TopView = styled.View`
  height: 100px;
  width: ${Window_WIDTH}px;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  margin-top: 15px;
`;

const OrderInfoContainer = styled.View`
  margin-top: 8px;
`;

const OrderItemWrapper = styled.View`
  padding-vertical: 4px;
`;

const OrderInfoView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default Order;
