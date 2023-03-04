import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Dimensions, Text} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import useClothsRelatedActions from '../hooks/useClothsRelatedActions';

const Window_WIDTH = Dimensions.get('window').width;

function BasketItem({purchaseId, isSelected, orderItems, existingItems}) {
  const {
    contentId,
    name,
    price,
    explain,
    category,
    brand,
    color,
    size,
    isChecked,
    thumbnailList,
    detailList,
  } = existingItems;
  const {addRecentProduct} = useClothsRelatedActions();
  const {setSelected} = useClothsRelatedActions();
  const navigation = useNavigation();

  return (
    <Container>
      <View style={{marginTop: 18}}>
        <Text style={{fontSize: 20, fontWight: 'bold'}}>{brand} 배송상품</Text>
      </View>
      <BasketContainer>
        <BasketView>
          {orderItems.map(item => {
            const {orderId, orderColor, orderSize, quantity} = item;
            const stringPrice = price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return (
              <ClothItemWrapper key={contentId}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <BouncyCheckbox
                    size={22}
                    iconStyle={{
                      borderRadius: 0,
                      borderColor: '#f66',
                    }}
                    innerIconStyle={{
                      borderRadius: 0,
                      borderWidth: 2.5,
                      borderColor: 'gray',
                    }}
                    fillColor="#f66"
                    isChecked={checkboxState}
                    onPress={() => setCheckboxState(!checkboxState)}
                    disableText={true}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DetailScreen', {
                        contentId,
                        price,
                        isChecked,
                      });
                      addRecentProduct({
                        contentId,
                        name,
                        explain,
                        category,
                        brand,
                        color,
                        price,
                        size,
                        isChecked,
                        thumbnailList,
                        detailList,
                      });
                    }}>
                    <ClothImage
                      height={150}
                      width={150}
                      thumbnailList={thumbnailList}
                    />
                    <View style={{paddingTop: 5}}>
                      <PriceText>{price}</PriceText>
                      <NameText>{name}</NameText>
                      <BrandText>{brand}</BrandText>
                    </View>
                  </TouchableOpacity>
                </View>
              </ClothItemWrapper>
            );
          })}
        </BasketView>
      </BasketContainer>
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
  flex: 1;
  width: ${Window_WIDTH}px;
  padding-horizontal: 10px;
`;

const BasketContainer = styled.View`
  margin-top: 8px;
`;

const BasketItemItemWrapper = styled.View`
  padding-vertical: 4px;
`;

const BasketView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
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

export default BasketItem;
