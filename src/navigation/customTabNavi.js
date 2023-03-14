import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Octicons';
import HomeIcon from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Want from '../screens/Want';

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

export default HomeTab;
