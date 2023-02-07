import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import useClothsRelatedActions from '../hooks/useClothsRelatedActions';

function ClothItem({
  contentId,
  price,
  containerHeight,
  containerWidth,
  height,
  heartSize,
  iconPaddingTop,
  iconPaddingLeft,
}) {
  const clothList = useSelector(state => state.clothList.clothList);
  const clickedClothList = clothList.find(item => item.contentId === contentId);
  const {brand, name, thumbnailList, isChecked} = clickedClothList;
  const {toggle} = useClothsRelatedActions();
  const navigation = useNavigation();
  return (
    <Container
      containerHeight={containerHeight}
      containerWidth={containerWidth}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailScreen', {
            contentId,
            price,
            isChecked,
          })
        }>
        <ClothImage
          height={height}
          width={'100%'}
          thumbnailList={thumbnailList}
        />
        {isChecked === false ? (
          <HeartPressable
            iconPaddingTop={iconPaddingTop}
            iconPaddingLeft={iconPaddingLeft}
            onPress={() => toggle(contentId)}
            activeOpacity={0.75}>
            <Icon name="heart" size={heartSize} color="white" />
          </HeartPressable>
        ) : (
          <HeartPressable
            iconPaddingTop={iconPaddingTop}
            iconPaddingLeft={iconPaddingLeft}
            onPress={() => toggle(contentId)}
            activeOpacity={0.75}>
            <Icon name="heart-fill" size={heartSize} color="#f66" />
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
  height: ${props => props.containerHeight}px;
  width: ${props => props.containerWidth}px;
  padding-horizontal: 10px;
`;

const HeartPressable = styled.TouchableOpacity`
  position: absolute;
  padding-top: ${props => props.iconPaddingTop}px;
  padding-left: ${props => props.iconPaddingLeft}px;
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
