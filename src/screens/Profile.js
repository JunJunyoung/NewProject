import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const Profile = ({navigation}) => {
  return (
    <Container>
      <Text>ProfileScreen</Text>
      <Button title="장바구니" onPress={() => navigation.navigate('Basket')} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.Button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default Profile;