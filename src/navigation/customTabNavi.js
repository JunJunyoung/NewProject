import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Dimensions, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabView, ScrollPager, TabBar} from 'react-native-tab-view';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import Icon from 'react-native-vector-icons/Octicons';
import HomeIcon from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Want from '../screens/Want';
import ClothInfo from '../screens/ClothInfo';
import Review from '../screens/Review';
import AskView from '../screens/AskView';
import DetailPage from '../screens/DetailPage';
import BottomButton from '../components/BottomButton';
import styled from 'styled-components';

const initialLayout = {width: Dimensions.get('window').width};
const BottomTab = createBottomTabNavigator();

const HomeTab = ({navigation}) => (
  <BottomTab.Navigator initialRouteName="YLBA">
    <BottomTab.Screen
      name="찜"
      component={Want}
      options={{
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        tabBarIcon: ({focused}) =>
          focused ? (
            <Icon size={30} name="heart-fill" color="#FF6666" />
          ) : (
            <Icon size={30} name="heart-fill" color="gray" />
          ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Basket')}
            style={{fontSize: 25, marginRight: 10}}>
            <Text>장바구니</Text>
          </TouchableOpacity>
        ),
      }}
    />
    <BottomTab.Screen
      name="YLBA"
      component={Home}
      options={{
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        tabBarIcon: ({focused}) =>
          focused ? (
            <HomeIcon
              size={35}
              name="home-filled"
              color="#FF6666"
              backgroundColor="white"
            />
          ) : (
            <HomeIcon size={35} name="home-filled" color="gray" />
          ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Basket')}
            style={{fontSize: 25, marginRight: 10}}>
            <Text>장바구니</Text>
          </TouchableOpacity>
        ),
      }}
    />
    <BottomTab.Screen
      name="마이페이지"
      component={Profile}
      options={{
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        tabBarIcon: ({focused}) =>
          focused ? (
            <Icon size={32} name="person-fill" color="#FF6666" />
          ) : (
            <Icon size={32} name="person-fill" color="gray" />
          ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Basket')}
            style={{fontSize: 25, marginRight: 10}}>
            <Text>장바구니</Text>
          </TouchableOpacity>
        ),
      }}
    />
  </BottomTab.Navigator>
);

const renderScene = ({route, contentId, price}) => {
  switch (route.key) {
    case 'first':
      return <ClothInfo contentId={contentId} price={price} />;
    case 'Review':
      return <Review contentId={contentId} price={price} />;
    case 'AskView':
      return <AskView contentId={contentId} price={price} />;
    default:
      return null;
  }
};

function DetailScreen({route}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '상품정보'},
    {key: 'second', title: '리뷰'},
    {key: 'third', title: '문의'},
  ]);
  return (
    <View style={{flex: 1}}>
      <DetailScrollView>
        <DetailPage
          contentId={route.params.contentId}
          price={route.params.price}
        />
        <TabView
          contentId={route.params.contentId}
          price={route.params.price}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={{flex: 1}}
          renderPager={props =>
            Platform.OS === 'ios' ? (
              <ScrollPager {...props} />
            ) : (
              <ViewPagerAdapter
                {...props}
                transition="curl"
                showPageIndicator
              />
            )
          }
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: 'black',
                border: 'none',
              }}
              style={{
                backgroundColor: 'white',
                shadowOffset: {height: 0, width: 0},
                shadowColor: 'gray',
              }}
              a
              inactiveColor={'gray'}
              activeColor={'black'}
              pressColor={'#C0C0C0'}
              labelStyle={{fontSize: 17, fontWeight: 'bold', paddingBottom: 4}}
            />
          )}
        />
        <View style={{flex: 1}}>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
        </View>
      </DetailScrollView>
      <View
        style={{
          textAlign: 'center',
          position: 'absolute',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 81,
          height: 40,
          width: '100%',
        }}>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 4}}>
          1,250명이 이 상품을 구매하는 중이에요 (구현예정)
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 80,
          height: 1,
          width: '100%',
          backgroundColor: '#E0E0E0',
        }}
      />
      <BottomButton
        isChecked={route.params.isChecked}
        contentId={route.params.contentId}
      />
    </View>
    // <DetailPage contentId={route.params.contentId} price={route.params.price} />
    //   <MiddleTab.Screen
    //     name="상품정보"
    //     children={() => (
    //       <ClothInfo
    //         contentId={route.params.contentId}
    //         price={route.params.price}
    //       />
    //     )}
    //     options={{
    //       headerTitleStyle: {
    //         fontSize: 20,
    //         fontWeight: 'bold',
    //       },
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => navigation.navigate('Basket')}
    //           style={{fontSize: 25, marginRight: 10}}>
    //           <Text>장바구니</Text>
    //         </TouchableOpacity>
    //       ),
    //     }}
    //   />
    //   <MiddleTab.Screen
    //     name="리뷰"
    //     children={() => (
    //       <Review
    //         contentId={route.params.contentId}
    //         price={route.params.price}
    //       />
    //     )}
    //     options={{
    //       headerTitleStyle: {
    //         fontSize: 20,
    //         fontWeight: 'bold',
    //       },
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => navigation.navigate('Basket')}
    //           style={{fontSize: 25, marginRight: 10}}>
    //           <Text>장바구니</Text>
    //         </TouchableOpacity>
    //       ),
    //     }}
    //   />
    //   <MiddleTab.Screen
    //     name="문의"
    //     children={() => (
    //       <AskView
    //         contentId={route.params.contentId}
    //         price={route.params.price}
    //       />
    //     )}
    //     options={{
    //       headerTitleStyle: {
    //         fontSize: 20,
    //         fontWeight: 'bold',
    //       },
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => navigation.navigate('Basket')}
    //           style={{fontSize: 25, marginRight: 10}}>
    //           <Text>장바구니</Text>
    //         </TouchableOpacity>
    //       ),
    //     }}
    //   />
  );
}

const DetailScrollView = styled.ScrollView`
  flex: 1;
  /* height: auto; */
`;

export {HomeTab, DetailScreen};
