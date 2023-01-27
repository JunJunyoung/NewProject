import 'react-native-gesture-handler';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Want from './src/screens/Want';
import Basket from './src/components/Basket';

const Tab = createBottomTabNavigator();
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
        tabBarStyle: {display: 'none'},
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
        tabBarStyle: {display: 'none'},
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
        tabBarStyle: {display: 'none'},
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
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          tabBarActiveTintColor: '#FF6666',
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="WantTab"
          component={WantStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon size={30} name="heart" color="#FF6666" />
              ) : (
                <Icon size={30} name="heart" color="gray" />
              ),
          }}
        />
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon
                  size={30}
                  name="home"
                  color="#FF6666"
                  backgroundColor="white"
                />
              ) : (
                <Icon size={30} name="home" color="gray" />
              ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon size={30} name="account" color="#FF6666" />
              ) : (
                <Icon size={30} name="account" color="gray" />
              ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
