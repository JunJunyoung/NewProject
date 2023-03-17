import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Dimensions, Image} from 'react-native';
import DetailPageHeader from './DetailPageHeader';
import styled from 'styled-components/native';
import BottomBuyButton from '../components/BottomBuyButton';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Window_WIDTH = Dimensions.get('window').width;

function DetailScreen({route}) {
  const {contentId, price, detailList, isChecked} = route.params;
  const [isVisibleMore, setIsVisibleMore] = useState(false);
  const deletedDetailList = detailList?.filter(item => item.detailID !== 1);

  return (
    <RootContainer>
      <ScrollView>
        <DetailPageHeader contentId={contentId} price={price} />
        <View>
          {detailList.length > 0 && <ImageBlock item={detailList[0]} />}
        </View>
        {isVisibleMore === false ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: 10,
              height: 100,
            }}>
            <MoreBtn
              onPress={() => {
                setIsVisibleMore(true);
              }}>
              <MoreText>상품 정보 펼쳐보기</MoreText>
              <Icon name="expand-more" size={25} color="#0066cc" />
            </MoreBtn>
          </View>
        ) : (
          deletedDetailList.map((item, idx) => {
            return (
              <ClothItemWrapper key={idx}>
                <View>
                  <ImageBlock item={item} />
                </View>
              </ClothItemWrapper>
            );
          })
        )}
      </ScrollView>
      <View style={{height: 80}}></View>
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
      <BottomBuyButton isChecked={isChecked} contentId={contentId} />
    </RootContainer>
  );
}

const RootContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const ClothItemWrapper = styled.View``;

const MoreBtn = styled.TouchableOpacity`
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 310px;
  border-radius: 7px;
  border-width: 1px;
  border-color: #0066cc;
`;

const MoreText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #0066cc;
  padding-bottom: 7px;
`;

const ImageBlock = ({item}) => {
  const [size, setSize] = useState({width: 0, height: 0});
  useEffect(() => {
    Image.getSize(item.uri, (width, height) => {
      setSize({width: Window_WIDTH, height: (Window_WIDTH * height) / width});
    });
  }, []);
  return (
    <FastImage
      style={{
        height: size.height,
        width: size.width,
      }}
      justifyContent="center"
      source={{
        uri: item.uri,
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default DetailScreen;
