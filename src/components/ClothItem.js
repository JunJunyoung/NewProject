import React, {useState} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

const SLIDER_WIDTH = Dimensions.get('window').width;

function ClothItem({
  contentId,
  category,
  name,
  explain,
  brand,
  price,
  isChecked,
  onPress,
  thumbnailList,
  detailList,
}) {
  const navigation = useNavigation();
  return (
    <Container>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailPage', {
            contentId,
            price,
            category,
            brand,
            name,
            explain,
            thumbnailList,
            detailList,
            isChecked,
          })
        }>
        <ClothImage height={180} width={'100%'} thumbnailList={thumbnailList} />
        {isChecked === false ? (
          <HeartPressable onPress={onPress} activeOpacity={0.75}>
            <Icon name="heart" size={27} color="white" />
          </HeartPressable>
        ) : (
          <HeartPressable onPress={onPress} activeOpacity={0.75}>
            <Icon name="heart-fill" size={27} color="#f66" />
          </HeartPressable>
        )}
      </TouchableOpacity>
      <View style={{paddingTop: 5}}>
        <PriceText>{price}</PriceText>
        <NameText>{name}</NameText>
        <BrandText>{brand}</BrandText>
      </View>
    </Container>
  );
}

const ClothImage = ({height, width, thumbnailList}) => {
  const uri = thumbnailList.find(item => item.thumbnailID === 1).uri;
  return (
    <View>
      <FastImage
        style={{height, width, borderRadius: 8}}
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

const Container = styled.View`
  height: 250px;
  width: ${SLIDER_WIDTH / 2};
  padding-horizontal: 10px;
`;

const HeartPressable = styled.TouchableOpacity`
  position: absolute;
  padding-top: 8px;
  padding-left: 142px;
`;

const PriceText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin: 2px;
  margin-left: 5px;
  color: black;
`;

const NameText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  margin: 2px;
  margin-left: 5px;
  color: black;
`;

const BrandText = styled.Text`
  font-size: 10px;
  text-align: left;
  margin: 2px;
  margin-left: 5px;
  color: gray;
`;

export default ClothItem;
