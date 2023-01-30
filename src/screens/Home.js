import React from 'react';
import {ScrollView, Text, Image} from 'react-native';
import styled from 'styled-components/native';
import ClothItem from '../components/ClothItem';

const content = [];

const Home = () => {
  return (
    <Container>
      <EventVieW>
        <EventScrollView horizontal={true}>
          <Image
            source={{
              uri: 'http://www.samsungsales.co.kr/images/event/sales/weekPromotion/ev_201907_03.jpg',
            }}
            style={{height: 300, width: 500}}
          />
          <Image
            source={{
              uri: 'https://img.freepik.com/free-psd/sport-event-horizontal-banner_23-2148947931.jpg?w=900&t=st=1674906388~exp=1674906988~hmac=ce9cdf44821b1f785c256fce5b2e9165e8cfab2b4da20acce86f886a1293a645',
            }}
            style={{height: 300, width: 500}}
          />
        </EventScrollView>
      </EventVieW>
      <RecommendText>회원님을 위한 추천상품</RecommendText>
      {/* <ClothScrollView horizontal={false}>
        <ClothView>
          {content.map(item => {
            const {
              옷 리스트업 프롭스
            } = item;
            return (
              <ClothItemWrapper>
                <ClothItem 옷 리스트업 프롭스 />
              </ClothItemWrapper>
            );
          })}
        </ClothView>
      </ClothScrollView> */}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const EventVieW = styled.View`
  flex: 1;
`;

const EventScrollView = styled.ScrollView`
  background-color: 'orange';
`;

const RecommendText = styled.Text`
  flex: 1;
  font-size: 20px;
  text-align: left;
  margin: 10px;
  margin-left: 8px;
  color: black;
`;

const ClothScrollView = styled.ScrollView`
  width: '100%';
  background-color: '#F2F2F2';
`;

const ClothView = styled.View`
  flex-direction: 'row';
  flex-wrap: 'wrap';
  padding-horizontal: 16px;
  justify-content: 'space-around';
`;

const ClothItemWrapper = styled.View`
  padding-vertical: 4px;
`;

export default Home;
