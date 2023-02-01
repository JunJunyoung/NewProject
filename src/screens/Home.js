import React from 'react';
import {ScrollView, View} from 'react-native';
import styled from 'styled-components/native';
import ClothItem from '../components/ClothItem';
import {useDispatch, useSelector} from 'react-redux';
import {toggle} from '../redux/ClothList';
import ScrollViewCarousel from '../components/ScrollViewCarousel';
import eventsImage from '../static/events.json';

const Home = () => {
  const clothList = useSelector(state => state.clothList.clothList);
  const dispatch = useDispatch();

  return (
    <Container showsVerticalScrollIndicator={false} stickyHeaderIndices={[2]}>
      <CarouselBox>
        <ScrollViewCarousel pages={eventsImage} />
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
              name,
              explain,
              brand,
              price,
              thumbnailList,
              detailList,
              isChecked,
              category,
            } = item;
            const stringPrice = price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return (
              <ClothItemWrapper key={contentId}>
                <ClothItem
                  name={name}
                  category={category}
                  explain={explain}
                  brand={brand}
                  price={stringPrice}
                  thumbnailList={thumbnailList}
                  detailList={detailList}
                  isChecked={isChecked}
                  onPress={() => dispatch(toggle(contentId))}
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
  flex: 1;
  margin-bottom: 0px;
  background-color: white;
  overflow: hidden;
`;

const ClothContainer = styled.View`
  flex: 1.1;
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
