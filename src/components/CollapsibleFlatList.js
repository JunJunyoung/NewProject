import React, {useCallback} from 'react';
import {View, Text, Animated, Dimensions, Image} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

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
      <ImageView>
        <Image source={{uri: item.uri}} />
      </ImageView>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ImageView = styled.View`
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default CollapsibleFlatList;
