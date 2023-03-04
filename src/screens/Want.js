import React from 'react';
import {View, Dimensions, Alert} from 'react-native';
import styled from 'styled-components/native';
import ClothItem from '../components/ClothItem';
import {useSelector} from 'react-redux';
import useClothsRelatedActions from '../hooks/useClothsRelatedActions';
import {exp} from 'react-native-reanimated';

const TRISECTION_WINDOW_WIDTH = Dimensions.get('window').width / 3;

const Want = () => {
  const {toggleAll} = useClothsRelatedActions();
  const clothList = useSelector(state => state.clothList.clothList);
  const deleteIsChecked = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠습니까?',
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            toggleAll();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };
  return (
    <Container showsVerticalScrollIndicator={false}>
      <TopView>
        <RecommendText>모두보기</RecommendText>
        <DeleteButton onPress={() => deleteIsChecked()}>
          <DeleteText style={{textAlign: 'right', fontWeight: 'bold'}}>
            전체 삭제
          </DeleteText>
        </DeleteButton>
      </TopView>
      <ClothContainer>
        <ClothView>
          {clothList.map(item => {
            const {
              contentId,
              price,
              name,
              explain,
              category,
              brand,
              color,
              size,
              isChecked,
              thumbnailList,
              detailList,
            } = item;
            const stringPrice = price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            if (isChecked === true) {
              return (
                <ClothItemWrapper key={contentId}>
                  <ClothItem
                    contentId={contentId}
                    price={stringPrice}
                    name={name}
                    explain={explain}
                    category={category}
                    brand={brand}
                    color={color}
                    size={size}
                    isChecked={isChecked}
                    thumbnailList={thumbnailList}
                    detailList={detailList}
                    containerHeight={200}
                    containerWidth={TRISECTION_WINDOW_WIDTH}
                    height={110}
                    heartSize={17}
                    iconPaddingTop={6}
                    iconPaddingLeft={90}
                  />
                </ClothItemWrapper>
              );
            }
          })}
        </ClothView>
      </ClothContainer>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const ClothContainer = styled.View`
  margin-top: 8px;
`;

const TopView = styled.View`
  height: 40px;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
`;

const RecommendText = styled.Text`
  font-size: 20px;
  text-align: left;
  margin-top: 5px;
  margin-left: 13px;
  color: black;
`;

const DeleteButton = styled.TouchableOpacity`
  height: 40px;
  width: 80px;
  margin-top: 12px;
  margin-right: 7px;
`;

const DeleteText = styled.Text`
  font-size: 14px;
  text-align: left;
  margin-top: 12px;
  margin-right: 13px;
  color: black;
`;

const ClothView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const ClothItemWrapper = styled.View`
  padding-vertical: 4px;
`;

export default Want;
