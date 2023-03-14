import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Basket from './src/screens/Basket';
import Order from './src/screens/Order';
import HomeTab from './src/navigation/customTabNavi';
import DetailScreen from './src/screens/DetailScreen';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useClothsRelatedActions from './src/hooks/useClothsRelatedActions';

const Stack = createStackNavigator();

const App = () => {
  const {addBasketProduct, addOrderProduct} = useClothsRelatedActions();

  useEffect(() => {
    async function load() {
      try {
        const rawBasketProduct = await AsyncStorage.getItem('basketProduct');
        const savedBasketProduct = JSON.parse(rawBasketProduct);
        addBasketProduct(savedBasketProduct);
      } catch (e) {
        console.log('Failed to load basketProduct');
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const rawOrderProduct = await AsyncStorage.getItem('orderProduct');
        const savedOrderProduct = JSON.parse(rawOrderProduct);
        addOrderProduct(savedOrderProduct);
      } catch (e) {
        console.log('Failed to load orderProduct');
      }
    }
    load();
  }, []);

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
            name="Order"
            component={Order}
            options={{
              tabBarStyle: {display: 'none'},
              title: '주문 내역',
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
