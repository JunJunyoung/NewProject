import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';

const window = Dimensions.get('window');

function CollapsibleFlatList(props) {
  const {
    contentId,
    headerHeight,
    tabBarHeight,
    tabRoute,
    listArrRef,
    isTabFocused,
  } = props;
  const clothList = useSelector(state => state.clothList.clothList);
  const clickedClothList = clothList.find(item => item.contentId === contentId);
  const {detailList} = clickedClothList;
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <Image source={{uri: item.uri}} />
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <View style={styles.rootContainer}>
      <Animated.FlatList
        ref={ref => {
          let foundIndex = listArrRef.current.findIndex(
            e => e.key === tabRoute.key,
          );
          if (foundIndex === -1) {
            listArrRef.current.push({
              key: tabRoute.key,
              value: ref,
            });
          } else {
            listArrRef.current[foundIndex] = {
              key: tabRoute.key,
              value: ref,
            };
          }
        }}
        data={detailList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingTop: headerHeight,
          minHeight: window.height + headerHeight - tabBarHeight,
        }}
        scrollEventThrottle={16}
        onScroll={
          isTabFocused
            ? Animated.event(
                [{nativeEvent: {contentOffset: {y: props.scrollY}}}],
                {useNativeDriver: true},
              )
            : null
        }
        onMomentumScrollBegin={props.onMomentumScrollBegin}
        onMomentumScrollEnd={props.onMomentumScrollEnd}
        onScrollEndDrag={props.onScrollEndDrag}
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  itemContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 25,
    color: '#FFD800',
  },
});

export default CollapsibleFlatList;
