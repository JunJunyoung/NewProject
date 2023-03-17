import React, {useEffect} from 'react';
import {View, Text, Platform, Dimensions, Alert} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ClothItem from '../components/ClothItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TRISECTION_WINDOW_WIDTH = Dimensions.get('window').width / 3;

const Profile = () => {
  const navigation = useNavigation();
  const clothList = useSelector(state => state.clothList.clothList);
  const recentProduct = useSelector(state => state.recentProduct);
  const orderProduct = useSelector(state => state.orderProduct.orderProduct);
  const deletedRecentProduct = recentProduct.filter((items, index) => {
    return (
      recentProduct.findIndex((item, i) => {
        return items.name === item.name;
      }) === index
    );
  });

  const wantItemNumber = clothList.filter(
    item => item.isChecked === true,
  ).length;

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log('Failed to reset');
    }
  };

  const checkForReset = () => {
    Alert.alert(
      '관리자',
      'Do you want to reset all the storage?',
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            clearAll();
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

  return (
    <Container>
      <ProfileView>
        <ProfileTouchable activeOpacity={0.8}>
          <Icon size={60} name="account-circle" color="#A0A0A0" />
        </ProfileTouchable>
        <ProfileTouchable onPress={checkForReset} activeOpacity={0.8}>
          <Icon size={45} name="cog" color="#A0A0A0" />
        </ProfileTouchable>
      </ProfileView>
      <StateView>
        <StateTouchable
          underlayColor={'#E0E0E0'}
          onPress={() => navigation.navigate('Order')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#202020'}}>
              주문 내역
            </Text>
            <Text style={{fontSize: 23, fontWeight: 'bold', color: 'blue'}}>
              {orderProduct?.length}
            </Text>
            <Icon size={30} name="chevron-right" color="#A0A0A0" />
          </View>
        </StateTouchable>
        <StateTouchable
          onPress={() => navigation.navigate('찜')}
          underlayColor={'#E0E0E0'}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#202020'}}>
              찜 관리
            </Text>
            <Text style={{fontSize: 23, fontWeight: 'bold', color: 'blue'}}>
              {wantItemNumber}
            </Text>
            <Icon size={30} name="chevron-right" color="#A0A0A0" />
          </View>
        </StateTouchable>
      </StateView>
      <View
        style={{
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        }}
      />
      <View style={{height: 300}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#202020',
            marginLeft: 20,
            marginTop: 25,
            marginBottom: 15,
          }}>
          최근에 본 상품
        </Text>
        <ClothContainer>
          <ClothView>
            {deletedRecentProduct.map(item => {
              const {
                contentId,
                price,
                name,
                explain,
                category,
                brand,
                color,
                size,
                isChecked,
                thumbnailList,
                detailList,
              } = item;
              const stringPrice = price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              return (
                <ClothItemWrapper key={contentId}>
                  <ClothItem
                    contentId={contentId}
                    name={name}
                    explain={explain}
                    category={category}
                    brand={brand}
                    color={color}
                    size={size}
                    isChecked={isChecked}
                    thumbnailList={thumbnailList}
                    detailList={detailList}
                    price={stringPrice}
                    containerHeight={200}
                    containerWidth={TRISECTION_WINDOW_WIDTH}
                    height={110}
                    heartSize={17}
                    iconPaddingTop={6}
                    iconPaddingLeft={90}
                  />
                </ClothItemWrapper>
              );
            })}
          </ClothView>
        </ClothContainer>
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ProfileView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 22px;
  margin-right: 25px;
  margin-top: 30px;
`;

const ProfileTouchable = styled.TouchableOpacity``;

const StateView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StateTouchable = styled.TouchableHighlight`
  flex: 1;
  height: 90px;
  width: 100%;
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 15px;
  background-color: white;
  margin: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 15px;
  ${Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    },
    android: {
      elevation: 20,
    },
  })}
`;

const ClothContainer = styled.ScrollView``;

const ClothView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const ClothItemWrapper = styled.View`
  padding-vertical: 4px;
`;

export default Profile;
