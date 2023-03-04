import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {View, Text, Dimensions, ScrollView} from 'react-native';

const WindowWIDTH = Dimensions.get('window').width;

const ClothInfo = ({contentId}) => {
  // const clothList = useSelector(state => state.clothList.clothList);
  // const clickedClothList = clothList.find(item => item.contentId === contentId);
  // const {detailList} = clickedClothList;
  return (
    <Container>
      <View style={{height: 800}}>
        <ScrollView>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
          <Text>구현 중입니다</Text>
        </ScrollView>
      </View>
    </Container>
    //   {detailList &&
    //     detailList.map(item => {
    //       const {detailID, uri} = item;
    //       return (
    //         <ClothItemWrapper key={detailID}>
    //           <View>
    //             <FastImage
    //               style={{height: 'auto', width: WindowWIDTH}}
    //               justifyContent="center"
    //               source={{
    //                 uri,
    //                 headers: {Authorization: 'someAuthToken'},
    //                 priority: FastImage.priority.normal,
    //               }}
    //               resizeMode={FastImage.resizeMode.cover}
    //             />
    //           </View>
    //         </ClothItemWrapper>
    //       );
    //     })}
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f7f7f7f7;
`;

const ClothItemWrapper = styled.View`
  padding-vertical: 4px;
`;

export default ClothInfo;
