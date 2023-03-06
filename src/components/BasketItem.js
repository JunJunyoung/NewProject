import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
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
      <View
        style={{
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 11,
          marginTop: 3,
        }}
      />
      <View
        style={{
          marginTop: 20,
          marginLeft: 12,
          height: 30,
          width: Window_WIDTH,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {brand} 배송상품
        </Text>
      </View>
      <BasketContainer>
        <BasketView>
          {orderItems.map((item, index) => {
            const {orderId, orderColor, orderSize, quantity} = item;
            const stringPrice = price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return (
              <ClothItemWrapper key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: Window_WIDTH * 0.9,
                    marginLeft: 15,
                    marginTop: 15,
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
                    // isChecked={checkboxState}
                    // onPress={() => setCheckboxState(!checkboxState)}
                    disableText={true}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
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
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <ClothImage
                          height={150}
                          width={150}
                          thumbnailList={thumbnailList}
                        />
                        <View style={{paddingTop: 5}}>
                          <BrandText>{brand}</BrandText>
                          <PriceText>{price}</PriceText>
                          <NameText>{name}</NameText>
                          <OptionView>
                            <Text
                              style={{
                                fontSize: 15,
                                marginLeft: 5,
                                marginBottom: 3,
                              }}>
                              {orderColor} / {orderSize} / {quantity}
                            </Text>
                          </OptionView>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
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
  width: ${Window_WIDTH}px;
`;

const BasketContainer = styled.View`
  margin-top: 8px;
`;

const ClothView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ClothItemWrapper = styled.View`
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
  margin-left: 8px;
  color: black;
`;

const NameText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  margin: 2px;
  margin-left: 8px;
  color: black;
`;

const BrandText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin: 2px;
  margin-left: 8px;
  color: gray;
`;

const OptionView = styled.View`
  justify-content: center;
  margin-top: 20px;
  margin-left: 8px;
  height: 45px;
  width: 160px;
  background-color: #e0e0e0;
  border-radius: 8px;
`;

export default BasketItem;
