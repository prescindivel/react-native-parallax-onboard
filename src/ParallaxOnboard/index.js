import React, { useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';

import { onScroll } from '../utils/animations';

import { MainContainer, ParallaxContainer } from './styles';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const { currentHeight: statusBarHeight } = StatusBar;

const ParallaxOnboard = ({ children, dividerWidth, animatedValue }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedScrollView, setAnimatedScrollView] = useState();

  const scrollTo = (index, animated = true) => {
    const pageWidth = deviceWidth + dividerWidth;
    const scrollOffset = index * pageWidth;

    if (!animatedScrollViewHasScrolled) {
      animatedValue.setValue(scrollOffset);
      setAnimatedScrollViewHasScrolled(true);
    }

    animatedScrollView._component.scrollTo({
      x: scrollOffset,
      y: 0,
      animated,
    });

    setCurrentIndex(index);
  };

  const onScrollEnd = e => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const viewSize = deviceWidth;

    const index = Math.abs((contentOffset / viewSize).toFixed()) || 0;

    setCurrentIndex(index);
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent"></StatusBar>
      <MainContainer pointerEvents="box-none">
        <ParallaxContainer
          horizontal
          scrollEnabled
          pagingEnabled
          scrollEventThrottle={6}
          statusBarHeight={statusBarHeight}
          pageHeight={deviceHeight}
          pageWidth={deviceWidth + dividerWidth}
          onMomentumScrollEnd={onScrollEnd}
          onScroll={() => onScroll(animatedValue)}
          ref={scrollView => {
            setAnimatedScrollView(scrollView);
          }}
        >
          {children}
        </ParallaxContainer>
      </MainContainer>
    </>
  );
};

export default ParallaxOnboard;
