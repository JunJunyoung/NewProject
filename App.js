// import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Want from './src/screens/Want';

const MaterialTab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const WantStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        headerTitleStyle: {
          fontSize: 18,
          textAlign: 'center',
        },
      }}
    />
  </HomeStack.Navigator>
);

const WantStackNavigator = () => (
  <WantStack.Navigator>
    <WantStack.Screen
      name="Want"
      component={Want}
      options={{
        headerTitleStyle: {
          fontSize: 18,
          textAlign: 'center',
        },
      }}
    />
  </WantStack.Navigator>
);

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerTitleStyle: {
          fontSize: 18,
          textAlign: 'center',
        },
      }}
    />
  </ProfileStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <MaterialTab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Want':
                iconName = 'heart';
                break;
              case 'Profile':
                iconName = 'account';
                break;
              default:
                iconName = 'star-outline';
            }
            return <Icon size={size} name={iconName} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#DC143C',
          inactiveTintColor: '#C7CDD3',
          showLabel: false,
        }}>
        <MaterialTab.Screen name="Want" component={WantStackNavigator} />
        <MaterialTab.Screen name="Home" component={HomeStackNavigator} />
        <MaterialTab.Screen name="Profile" component={ProfileStackNavigator} />
      </MaterialTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
