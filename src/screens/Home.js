import React from 'react';
import {Dimensions, View} from 'react-native';
import styled from 'styled-components/native';
import ClothItem from '../components/ClothItem';
import {useSelector} from 'react-redux';
import ScrollViewCarousel from '../components/ScrollViewCarousel';
import eventsImage from '../static/events.json';
import {color} from 'react-native-reanimated';

const HALF_WINDOW_WIDTH = Dimensions.get('window').width / 2;

const Home = () => {
  const clothList = useSelector(state => state.clothList.clothList);

  return (
    <Container showsVerticalScrollIndicator={false} stickyHeaderIndices={[2]}>
      <CarouselBox height={210}>
        <ScrollViewCarousel pages={eventsImage} height={210} />
      </CarouselBox>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        }}
      />
      <TextView>
        <RecommendText>회원님을 위한 추천상품</RecommendText>
        <SponsoredText>sponsored</SponsoredText>
      </TextView>
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
                  containerHeight={250}
                  height={180}
                  containerWidth={HALF_WINDOW_WIDTH}
                  heartSize={31}
                  iconPaddingTop={8}
                  iconPaddingLeft={142}
                />
              </ClothItemWrapper>
            );
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

const CarouselBox = styled.View`
  height: ${props => props.height}px;
  margin-bottom: 0px;
  background-color: white;
  overflow: hidden;
`;

const ClothContainer = styled.View`
  margin-top: 8px;
`;
const TextView = styled.View`
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

const SponsoredText = styled.Text`
  font-size: 13px;
  text-align: right;
  margin: 2px;
  margin-right: 13px;
  margin-top: 17px;
  color: gray;
`;

const ClothView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  /* padding-horizontal: 2; */
  justify-content: space-around;
`;

const ClothItemWrapper = styled.View`
  padding-vertical: 4px;
`;

export default Home;
