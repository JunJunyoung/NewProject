import React from 'react';
import {View, Text, Platform} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Profile = () => {
  const navigation = useNavigation();
  // const recentProduct = useSelector(state => state.recentProduct.recentProduct);
  // const {
  //   name,
  //   explain,
  //   category,
  //   brand,
  //   color,
  //   price,
  //   size,
  //   thumbnailList,
  //   detailList,
  //   isChecked,
  // } = recentProduct;
  return (
    <Container>
      <ProfileView>
        <ProfileTouchable activeOpacity={0.8}>
          <Icon size={60} name="account-circle" color="#A0A0A0" />
        </ProfileTouchable>
        <ProfileTouchable activeOpacity={0.8}>
          <Icon size={45} name="cog" color="#A0A0A0" />
        </ProfileTouchable>
      </ProfileView>
      <StateView>
        <StateTouchable underlayColor={'#E0E0E0'}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#202020'}}>
              주문 내역
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
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#202020',
          marginLeft: 22,
          marginTop: 20,
        }}>
        최근에 본 상품
      </Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
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

const ClothContainer = styled.View`
  margin-top: 8px;
`;

const ClothView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const ClothItemWrapper = styled.View`
  padding-vertical: 4px;
`;
export default Profile;
