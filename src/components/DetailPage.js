import React from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Octicons';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {toggle} from '../redux/ClothList';

const DetailPage = ({route}) => {
  const {
    price,
    category,
    brand,
    name,
    explain,
    thumbnailList,
    detailList,
    isChecked,
  } = route.params;
  const dispatch = useDispatch();
  return (
    <Container>
      <ThumbnailView horizontal={true} showsHorizontalScrollIndicator={true}>
        {thumbnailList &&
          thumbnailList.map(item => {
            const {thumbnailID, uri} = item;
            return (
              <ImageItemWrapper key={thumbnailID}>
                <Image source={{uri}} />
              </ImageItemWrapper>
            );
          })}
      </ThumbnailView>
      <View
        style={{
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        }}
      />
      <View style={{paddingTop: 5}}>
        <CategoryText>{category}</CategoryText>
      </View>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        }}
      />
      <View style={{paddingTop: 5}}>
        <NameText>{name}</NameText>
        <BrandText>{brand}</BrandText>
        <ExplainText>{explain}</ExplainText>
      </View>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        }}
      />
      <View style={{paddingTop: 5}}>
        <PriceText>{price}</PriceText>
      </View>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        }}
      />
      <DetailImage height={'100%'} width={'100%'} detailList={detailList} />
      {/* <BottomButtonView>
        <View style={{height: 50, width: 50}}>
          {isChecked === false ? (
            <WantButton
              onPress={() => dispatch(toggle(contentId))}
              activeOpacity={0.9}>
              <Icon name="heart" size={40} color="black" />
            </WantButton>
          ) : (
            <WantButton
              onPress={() => dispatch(toggle(contentId))}
              activeOpacity={0.9}>
              <Icon name="heart-fill" size={40} color="#f66" />
            </WantButton>
          )}
        </View>
        <View style={{height: 50, width: 150}}>
          <BottomButton title="구매하기" />
        </View>
      </BottomButtonView> */}
    </Container>
  );
};

const DetailImage = ({height, width, detailList}) => {
  const uri = detailList.find(item => item.detailID === 1).uri;
  return (
    <View>
      <FastImage
        style={{height, width}}
        justifyContent="center"
        source={{
          uri,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const ImageItemWrapper = styled.View`
  padding-vertical: 4px;
`;

const ThumbnailView = styled.ScrollView``;
const CategoryText = styled.Text`
  font-size: 10px;
  text-align: left;
  margin: 2px;
  margin-left: 8px;
  color: gray;
`;

const BrandText = styled.Text`
  font-size: 11px;
  text-align: left;
  margin: 2px;
  margin-left: 8px;
  color: gray;
`;

const ExplainText = styled.Text`
  font-size: 13px;
  text-align: left;
  margin-top: 5px;
  margin-left: 8px;
  margin-right: 8px;
  color: black;
`;

const NameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin: 2px;
  margin-left: 8px;
  color: black;
`;

const PriceText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  text-align: left;
  margin: 2px;
  margin-left: 8px;
  color: black;
`;

const BottomButtonView = styled.View`
  position: absolute;
  background-color: yellow;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  right: 0;
  bottom: 0;
  height: 6rem;
`;

const BottomButton = styled.Button`
  color: tomato;
`;

const WantButton = styled.TouchableOpacity`
  color: red;
`;

export default DetailPage;
