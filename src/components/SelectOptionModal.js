import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

const Window_WIDTH = Dimensions.get('window').width;

const SelectOptionModal = props => {
  const {
    contentId,
    nextId,
    optionList,
    setOptionList,
    optionVisible,
    setOptionVisible,
    setPurchaseVisible,
  } = props;
  const clothList = useSelector(state => state.clothList.clothList);
  const clickedClothList = clothList.find(item => item.contentId === contentId);
  const {color, price, size} = clickedClothList;
  const processedSize = size.map((item, label) =>
    item.count === 0 ? {...item, disabled: true} : {...item, disabled: false},
  );

  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetOptionModal = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeOptionModal = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          setCloseModal();
        } else {
          resetOptionModal.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (props.optionVisible) {
      resetOptionModal.start();
    }
  }, [props.optionVisible]);

  const setCloseModal = () => {
    closeOptionModal.start(() => setOptionVisible(false));
  };

  const [colorOpen, setColorOpen] = useState(true);
  const [colorValue, setColorValue] = useState(null);
  const [colorItems, setColorItems] = useState(color);

  const [sizeOpen, setSizeOpen] = useState(false);
  const [sizeValue, setSizeValue] = useState(null);
  const [sizeItems, setSizeItems] = useState(processedSize);

  const onColorOpen = useCallback(() => {
    setSizeOpen(false);
  }, []);

  const onSizeOpen = useCallback(() => {
    setColorOpen(false);
  }, []);

  useEffect(() => {
    const setValidator = () => {
      if (
        optionList.filter(
          item =>
            item.orderColor === colorValue && item.orderSize === sizeValue,
        ).length === 0
      ) {
        setOptionList([
          ...optionList,
          {
            orderId: nextId.current,
            orderColor: colorValue,
            orderSize: sizeValue,
            quantity: 1,
            price: price,
            remainInventory: size.find(item => item.value === sizeValue).count,
            isSelected: false,
          },
        ]);
        setOptionVisible(false);
        setPurchaseVisible(true);
        setColorValue(null);
        setSizeValue(null);
        nextId.current += 1;
      } else {
        setOptionList(
          optionList.map(item =>
            item.orderColor === colorValue && item.orderSize === sizeValue
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        );
        setOptionVisible(false);
        setPurchaseVisible(true);
        setColorValue(null);
        setSizeValue(null);
      }
    };
    if (colorValue && sizeValue) setValidator();
  }, [colorValue, sizeValue]);

  return (
    <Modal
      visible={optionVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <OverlayView>
        <TouchableWithoutFeedback onPress={() => setOptionVisible(false)}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
        {(!colorValue || !sizeValue) && (
          <Animated.View
            style={{
              height: 500,
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: 'white',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              transform: [{translateY: translateY}],
            }}
            {...panResponders.panHandlers}>
            <View style={{marginTop: 20}}>
              <ColorDropDownPicker
                style={{borderColor: '#c0c0c0'}}
                open={colorOpen}
                value={colorValue}
                items={colorItems}
                setOpen={setColorOpen}
                setValue={setColorValue}
                setItems={setColorItems}
                placeholder="컬러 선택하기"
                placeholderStyle={{color: '#808080'}}
                containerStyle={
                  colorOpen === false
                    ? {height: 70, width: '95%'}
                    : {height: 180, width: '95%'}
                }
                textStyle={{
                  fontSize: 16,
                }}
                labelStyle={{
                  fontSize: 16,
                }}
                onOpen={onColorOpen}
                zIndex={500}
                listMode="SCROLLVIEW"
              />
            </View>
            <View style={{marginTop: 5}}>
              <SizeDropDownPicker
                style={{borderColor: '#c0c0c0'}}
                open={sizeOpen}
                value={sizeValue}
                items={sizeItems}
                setOpen={open => {
                  if (open && !colorValue)
                    Alert.alert('상위 옵션을 먼저 선택해주세요');
                  else setSizeOpen(open);
                }}
                setValue={setSizeValue}
                setItems={setSizeItems}
                placeholder="사이즈 선택하기"
                placeholderStyle={{color: '#808080'}}
                containerStyle={{height: 180, width: '95%'}}
                textStyle={{fontSize: 16}}
                labelStyle={{
                  fontSize: 16,
                }}
                disabledItemLabelStyle={{
                  opacity: 0.7,
                  color: 'gray',
                  textDecorationLine: 'line-through',
                }}
                onOpen={onSizeOpen}
                zIndex={1000}
                listMode="SCROLLVIEW"
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 80,
                height: 1,
                width: '100%',
                backgroundColor: '#E0E0E0',
              }}
            />
            <BottomOptionView>
              <CloseButton onPress={() => setOptionVisible(false)}>
                <CloseText>옵션 선택 닫기</CloseText>
              </CloseButton>
            </BottomOptionView>
          </Animated.View>
        )}
      </OverlayView>
    </Modal>
  );
};

const OverlayView = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 3000;
`;

const ColorDropDownPicker = styled(DropDownPicker)``;
const SizeDropDownPicker = styled(DropDownPicker)``;

const BottomOptionView = styled.View`
  position: absolute;
  background-color: white;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  height: 80px;
  width: 90%;
`;

const InactiveSizeView = styled.TouchableOpacity`
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #c0c0c0;
`;

const CloseButton = styled.TouchableOpacity`
  background-color: white;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 90%;
  border-radius: 7px;
  border-width: 1px;
  border-color: #e0e0e0;
`;

const CloseText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: black;
  padding-bottom: 7px;
`;

export default SelectOptionModal;
