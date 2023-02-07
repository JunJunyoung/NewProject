import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import ClothItem from '../components/ClothItem';
import {useSelector} from 'react-redux';
import ScrollViewCarousel from '../components/ScrollViewCarousel';
import eventsImage from '../static/events.json';

const Want = () => {
  const clothList = useSelector(state => state.clothList.clothList);
  return (
    <Container showsVerticalScrollIndicator={false}>
      <TextView>
        <RecommendText>내 찜</RecommendText>
      </TextView>
      <ClothContainer>
        <ClothView>
          {clothList.map(item => {
            const {contentId, price} = item;
            const stringPrice = price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return (
              <ClothItemWrapper key={contentId}>
                <ClothItem
                  contentId={contentId}
                  price={stringPrice}
                  containerHeight={180}
                  height={110}
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
  justify-content: space-around;
`;

const ClothItemWrapper = styled.View`
  padding-vertical: 4px;
`;

export default Want;
