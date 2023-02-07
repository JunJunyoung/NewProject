import 'react-native-gesture-handler';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Basket from './src/components/Basket';
import {HomeTab, DetailScreen} from './src/navigation/customTabNavi';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
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
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={{
              tabBarStyle: {display: 'none'},
              title: '상품상세정보',
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
    </Provider>
  );
};

export default App;
