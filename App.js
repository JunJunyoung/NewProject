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

const HomeTab = ({navigation}) => (
  <Tab.Navigator>
    <Tab.Screen
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
            <Icon size={30} name="heart" color="#FF6666" />
          ) : (
            <Icon size={30} name="heart" color="gray" />
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
    <Tab.Screen
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
            <Icon
              size={30}
              name="home"
              color="#FF6666"
              backgroundColor="white"
            />
          ) : (
            <Icon size={30} name="home" color="gray" />
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
    <Tab.Screen
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
            <Icon size={30} name="account" color="#FF6666" />
          ) : (
            <Icon size={30} name="account" color="gray" />
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
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#FF6666',
          tabBarShowLabel: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Basket"
          component={Basket}
          options={{
            tabBarStyle: {display: 'none'},
            title: '장바구니',
            headerShown: true,
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
