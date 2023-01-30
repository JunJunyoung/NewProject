import React from 'react';

const Placeholder = Styled.View`
    width: ${widthPercent(360)}px;
    height: ${ScreenHeight + StatusHeight}px;    
    paddingLeft: ${widthPercentage(155)}px;
    paddingTop: ${heightPercentage(360)}px;
    background-color: #FFFFFF;
`;

const DetailPage = () => {
  return (
    <Placeholder style={{backgroundColor: '#FF1111'}}>
      <Text> 상세페이지 </Text>
    </Placeholder>
  );
};

export default DetailPage;
