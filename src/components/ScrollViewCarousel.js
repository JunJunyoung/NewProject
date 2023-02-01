import React, {useState, useRef} from 'react';
import {View, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width + 40;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const renderItem = ({item}) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Image
        source={{uri: item.uri}}
        style={{width: 411, height: 224, resizeMode: 'contain'}}
      />
    </View>
  );
};

function ScrollViewCarousel({pages}) {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <View style={{alignItems: 'center'}}>
      <Carousel
        ref={isCarousel}
        layout={'stack'}
        data={pages}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
      />
      <Pagination
        containerStyle={{
          position: 'absolute',
          paddingVertical: 197,
        }}
        dotsLength={pages.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          backgroundColor: '#303030',
        }}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: '#505050',
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.5}
      />
    </View>
  );
}

export default ScrollViewCarousel;
