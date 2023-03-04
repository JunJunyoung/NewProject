import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View, Animated, TouchableOpacity, Text} from 'react-native';
import {TabView} from 'react-native-tab-view';
import DetailPageHeader from './DetailPageHeader';
import CollapsibleFlatList from '../components/CollapsibleFlatList';
import styled from 'styled-components/native';
import BottomBuyButton from '../components/BottomBuyButton';

const TABBAR_HEIGHT = 100;

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
            {
              flexDirection: 'row',
              alignItems: 'center',
              height: TABBAR_HEIGHT,
              backgroundColor: '#FFFFFF',
              zIndex: 1,
            },
            {transform: [{translateY: tabBarTranslateY}]},
          ]}>
          {props.navigationState.routes.map((route, idx) => {
            return (
              <TouchableOpacity
                style={{flex: 1}}
                key={idx}
                onPress={() => {
                  onTabPress(idx);
                }}>
                <CollapsibleTabBarLabelContainer>
                  <CollapsibleTabBarLabelText>
                    {route.title}
                  </CollapsibleTabBarLabelText>
                </CollapsibleTabBarLabelContainer>
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
    <RootContainer>
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
          position: 'absolute',
          width: '100%',
          transform: [{translateY: headerTranslateY}],
        }}
        onLayout={headerOnLayout}
        pointerEvents="box-none">
        <DetailPageHeader contentId={contentId} price={price} />
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
          1,250명이 이 상품을 구매하는 중이에요
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
    </RootContainer>
  );
}

const RootContainer = styled.View`
  flex: 1;
`;

const CollapsibleTabBarLabelContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CollapsibleTabBarLabelText = styled.Text`
  font-size: 17;
  font-weight: bold;
  color: black;
`;

export default DetailScreen;
