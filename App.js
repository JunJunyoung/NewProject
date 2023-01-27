// import 'react-native-gesture-handler';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Want from './src/screens/Want';
import Basket from './src/components/Basket';

const MaterialTab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const WantStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={({navigation}) => ({
        title: 'YLBA',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Basket')}
            style={{fontSize: 25, marginRight: 10}}>
            <Text>장바구니</Text>
          </TouchableOpacity>
        ),
      })}
    />
    <HomeStack.Screen
      name="Basket"
      component={Basket}
      options={{
        title: '장바구니',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        headerTitleAlign: 'center',
      }}
    />
  </HomeStack.Navigator>
);

const WantStackNavigator = () => (
  <WantStack.Navigator>
    <WantStack.Screen
      name="찜"
      component={Want}
      options={({navigation}) => ({
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Basket')}
            style={{fontSize: 25, marginRight: 10}}>
            <Text>장바구니</Text>
          </TouchableOpacity>
        ),
      })}
    />
    <WantStack.Screen
      name="Basket"
      component={Basket}
      options={{
        title: '장바구니',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        headerTitleAlign: 'center',
      }}
    />
  </WantStack.Navigator>
);

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="마이페이지"
      component={Profile}
      options={({navigation}) => ({
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Basket')}
            style={{fontSize: 25, marginRight: 10}}>
            <Text>장바구니</Text>
          </TouchableOpacity>
        ),
      })}
    />
    <ProfileStack.Screen
      name="Basket"
      component={Basket}
      options={{
        title: '장바구니',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        headerTitleAlign: 'center',
      }}
    />
  </ProfileStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <MaterialTab.Navigator
        initialRouteName="HomeTab"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
            switch (route.name) {
              case 'HomeTab':
                iconName = 'home';
                break;
              case 'WantTab':
                iconName = 'heart';
                break;
              case 'ProfileTab':
                iconName = 'account';
                break;
            }
            return <Icon size={30} name={iconName} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#FF6666',
          inactiveTintColor: 'gray',
        }}>
        <MaterialTab.Screen name="WantTab" component={WantStackNavigator} />
        <MaterialTab.Screen name="HomeTab" component={HomeStackNavigator} />
        <MaterialTab.Screen
          name="ProfileTab"
          component={ProfileStackNavigator}
        />
      </MaterialTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
