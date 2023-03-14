import React from 'react';
import {View, Dimensions, Text} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Octicons';
import {useSelector} from 'react-redux';
import ScrollViewCarousel from '../components/ScrollViewCarousel';

const WindowWIDTH = Dimensions.get('window').width;

const DetailPageHeader = ({contentId, price, pointerEvents}) => {
  const clothList = useSelector(state => state.clothList.clothList);
  const clickedClothList = clothList.find(item => item.contentId === contentId);
  const {brand, category, name, explain, thumbnailList} = clickedClothList;
  return (
    <Container pointerEvents="box-none">
      <CarouselBox height={400}>
        <ScrollViewCarousel pages={thumbnailList} height={400} />
      </CarouselBox>
      <View
        style={{
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        }}
      />
      <View style={{backgroundColor: 'white'}}>
        <CategoryText>{category}</CategoryText>
      </View>
      <View
        style={{
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        }}
      />
      <View style={{paddingTop: 5, backgroundColor: 'white'}}>
        <NameText>{name}</NameText>
        <BrandText>{brand}</BrandText>
        <ExplainText>{explain}</ExplainText>
      </View>
      <View style={{paddingTop: 5, backgroundColor: 'white'}}>
        <PriceText>{price}</PriceText>
      </View>
      <View
        style={{
          marginTop: 5,
        }}
      />
      <View style={{paddingTop: 5, backgroundColor: 'white'}}></View>
    </Container>
  );
};

const Container = styled.View`
  height: 580px;
  width: 100%;
  background-color: #f7f7f7f7;
`;

const CarouselBox = styled.View`
  height: ${props => props.height}px;
  padding-vertical: 0.7px;
  width: 100%;
  margin-bottom: 0px;
  background-color: white;
  overflow: hidden;
`;

const CategoryText = styled.Text`
  font-size: 10px;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 8px;
  color: gray;
`;

const BrandText = styled.Text`
  font-size: 11px;
  text-align: left;
  margin-bottom: 2px;
  margin-left: 8px;
  color: gray;
`;

const ExplainText = styled.Text`
  font-size: 13px;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 8px;
  margin-right: 8px;
  color: black;
`;

const NameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin-top: 10px;
  margin-left: 8px;
  color: black;
`;

const PriceText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  text-align: left;
  margin-left: 8px;
  color: black;
`;

export default DetailPageHeader;
