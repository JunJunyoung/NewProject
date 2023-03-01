import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, TouchableOpacity, Text} from 'react-native';
import {TabView} from 'react-native-tab-view';
import DetailPageHeader from './DetailPageHeader';
import CollapsibleFlatList from '../components/CollapsibleFlatList';
import styled from 'styled-components';
import BottomBuyButton from '../components/BottomBuyButton';

const TABBAR_HEIGHT = 90;

function DetailScreen({route}) {
  const {contentId, price, isChecked} = route.params;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabRoutes, setTabRoutes] = useState([
    {key: 'first', title: '상품정보'},
    {key: 'second', title: '리뷰'},
    {key: 'third', title: '문의'},
  ]);
  const [tabIndex, setTabIndex] = useState(0);
  const tabIndexRef = useRef(0);
  const isListGlidingRef = useRef(false);
  const listArrRef = useRef([]);
  const listOffsetRef = useRef({});

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const tabBarTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolateRight: 'clamp',
  });

  useEffect(() => {
    scrollY.addListener(({value}) => {});

    return () => {
      scrollY.removeListener();
    };
  }, []);

  const headerOnLayout = useCallback(event => {
    const {height} = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  const onTabIndexChange = useCallback(id => {
    setTabIndex(id);
    tabIndexRef.current = id;
  }, []);

  const onTabPress = useCallback(idx => {
    if (!isListGlidingRef.current) {
      setTabIndex(idx);
      tabIndexRef.current = idx;
    }
  }, []);

  const syncScrollOffset = () => {
    const focusedTabKey = tabRoutes[tabIndexRef.current].key;

    listArrRef.current.forEach(item => {
      if (item.key !== focusedTabKey) {
        if (scrollY._value < headerHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffsetRef.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= headerHeight) {
          if (
            listOffsetRef.current[item.key] < headerHeight ||
            listOffsetRef.current[item.key] === null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: headerHeight,
                animated: false,
              });
              listOffsetRef.current[item.key] = headerHeight;
            }
          }
        }
      } else {
        if (item.value) {
          listOffsetRef.current[item.key] = scrollY._value;
        }
      }
    });
  };

  const onMomentumScrollBegin = useCallback(() => {
    isListGlidingRef.current = true;
  }, []);
  const onMomentumScrollEnd = useCallback(() => {
    isListGlidingRef.current = false;
    syncScrollOffset();
  }, [headerHeight]);
  const onScrollEndDrag = useCallback(() => {
    syncScrollOffset();
  }, [headerHeight]);

  const renderTabBar = useCallback(
    props => {
      return (
        <Animated.View
          style={[
            styles.collapsibleTabBar,
            {transform: [{translateY: tabBarTranslateY}]},
          ]}>
          {props.navigationState.routes.map((route, idx) => {
            return (
              <TouchableOpacity
                style={styles.collapsibleTabBarButton}
                key={idx}
                onPress={() => {
                  onTabPress(idx);
                }}>
                <View style={styles.collapsibleTabBarLabelContainer}>
                  <Text style={styles.collapsibleTabBarLabelText}>
                    {route.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      );
    },
    [headerHeight],
  );

  const renderScene = useCallback(
    ({route}) => {
      const isFocused = route.key === tabRoutes[tabIndex].key;
      return (
        <CollapsibleFlatList
          contentId={contentId}
          headerHeight={headerHeight}
          tabBarHeight={TABBAR_HEIGHT}
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          tabRoute={route}
          listArrRef={listArrRef}
          isTabFocused={isFocused}
        />
      );
    },
    [headerHeight, tabIndex],
  );

  return (
    <View style={styles.rootContainer}>
      {headerHeight > 0 ? (
        <TabView
          navigationState={{index: tabIndex, routes: tabRoutes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={onTabIndexChange}
        />
      ) : null}
      <Animated.View
        style={{
          ...styles.headerContainer,
          transform: [{translateY: headerTranslateY}],
        }}
        onLayout={headerOnLayout}
        pointerEvents="box-none">
        <DetailPageHeader contentId={contentId} />
      </Animated.View>
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
          1,250명이 이 상품을 구매하는 중이에요!
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
      <BottomBuyButton
        isChecked={route.params.isChecked}
        contentId={route.params.contentId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
  collapsibleTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: TABBAR_HEIGHT,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  collapsibleTabBarButton: {
    flex: 1,
  },
  collapsibleTabBarLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  collapsibleTabBarLabelText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
});

// const renderScene = ({route, contentId, price}) => {
//   switch (route.key) {
//     case 'first':
//       return <ClothInfo contentId={contentId} price={price} />;
//     case 'Review':
//       return <Review contentId={contentId} price={price} />;
//     case 'AskView':
//       return <AskView contentId={contentId} price={price} />;
//     default:
//       return null;
//   }
// };

// function DetailScreen({route}) {
//   const initialLayout = useWindowDimensions();

//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     {key: 'first', title: '상품정보'},
//     {key: 'second', title: '리뷰'},
//     {key: 'third', title: '문의'},
//   ]);

//   return (
//     <View style={{flex: 1}}>
//       <TabView
//         contentId={route.params.contentId}
//         price={route.params.price}
//         navigationState={{index, routes}}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{width: initialLayout.width}}
//         style={{flex: 1, paddingTop: 590}}
//         renderPager={props =>
//           Platform.OS === 'ios' ? (
//             <ScrollPager {...props} />
//           ) : (
//             <ViewPagerAdapter {...props} transition="curl" showPageIndicator />
//           )
//         }
//         renderTabBar={props => (
//           <TabBar
//             {...props}
//             indicatorStyle={{
//               backgroundColor: 'black',
//               border: 'none',
//             }}
//             style={{
//               backgroundColor: 'white',
//               shadowOffset: {height: 0, width: 0},
//               shadowColor: 'gray',
//             }}
//             a
//             inactiveColor={'gray'}
//             activeColor={'black'}
//             pressColor={'#C0C0C0'}
//             labelStyle={{
//               fontSize: 17,
//               fontWeight: 'bold',
//               paddingBottom: 4,
//             }}
//           />
//         )}
//       />
//     </View>
//   );
// }

const DetailScrollView = styled.ScrollView`
  flex: 1;
  position: absolute;
  height: 600px;
`;

export default DetailScreen;
