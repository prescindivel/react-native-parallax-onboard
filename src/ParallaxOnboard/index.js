import React, { Children, useState, useMemo } from 'react';
import { Dimensions, StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { event, Value } from 'react-native-reanimated';

import { useSafeArea } from 'react-native-safe-area-context';

import PropTypes from 'prop-types';

import ParallaxOnboardPage from '../ParallaxOnboardPage';

import {
  MainContainer,
  ParallaxContainer,
  PageOuterContainer,
  PageDivider,
  Footer,
  ActionsContainer,
  ArrowButton,
} from './styles';
import ParallaxPagination from '../ParallaxPagination';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const ParallaxOnboard = ({
  children,
  animatedValue,
  speed,
  dividerWidth,
  dividerColor,
  backgroundColor,
}) => {
  const insets = useSafeArea();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedScrollView, setAnimatedScrollView] = useState();
  const [
    animatedScrollViewHasScrolled,
    setAnimatedScrollViewHasScrolled,
  ] = useState(false);

  const childrenLength = useMemo(() => Children.toArray(children), [children]);

  const scrollTo = (index, animated = true) => {
    const pageWidth = deviceWidth + dividerWidth;
    const scrollOffset = index * pageWidth;

    if (!animatedScrollViewHasScrolled) {
      animatedValue.setValue(scrollOffset);
      setAnimatedScrollViewHasScrolled(true);
    }

    // eslint-disable-next-line no-underscore-dangle
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
      <StatusBar translucent backgroundColor="transparent" />
      <MainContainer
        forceInset={{ vertical: 'never' }}
        pointerEvents="box-none"
      >
        <ParallaxContainer
          horizontal
          scrollEnabled
          pagingEnabled
          scrollEventThrottle={6}
          pageHeight={deviceHeight}
          pageWidth={deviceWidth + dividerWidth}
          dividerColor={dividerColor}
          backgroundColor={backgroundColor}
          onMomentumScrollEnd={onScrollEnd}
          onScroll={event(
            [
              {
                nativeEvent: { contentOffset: { x: animatedValue } },
              },
            ],
            { useNativeDriver: true }
          )}
          ref={scrollView => {
            setAnimatedScrollView(scrollView);
          }}
        >
          {Children.map(children, (child, i) => {
            return (
              <PageOuterContainer zIndex={-i}>
                <ParallaxOnboardPage
                  index={i}
                  pageWidth={deviceWidth}
                  pageHeight={deviceHeight}
                  dividerWidth={dividerWidth}
                  speed={speed}
                  animatedValue={animatedValue}
                  BackgroundComponent={child.props.BackgroundComponent}
                  ForegroundComponent={child.props.ForegroundComponent}
                />
                <PageDivider
                  dividerWidth={dividerWidth}
                  pageHeight={deviceHeight}
                />
              </PageOuterContainer>
            );
          })}
        </ParallaxContainer>

        <Footer paddingBottom={insets.bottom}>
          <ActionsContainer>
            <ArrowButton
              disabled={currentIndex === 0}
              onPress={() => {
                scrollTo(currentIndex - 1);
              }}
            >
              <Icon name="arrow-back" size={30} color="white" />
            </ArrowButton>

            <ParallaxPagination
              activeIndex={currentIndex}
              dotsLength={childrenLength.length}
            />

            <ArrowButton
              disabled={currentIndex === childrenLength - 1}
              onPress={() => {
                scrollTo(currentIndex + 1);
              }}
            >
              <Icon name="arrow-forward" size={30} color="white" />
            </ArrowButton>
          </ActionsContainer>
        </Footer>
      </MainContainer>
    </>
  );
};

ParallaxOnboard.propTypes = {
  children: PropTypes.arrayOf((propValue, key, componentName) => {
    const childComponentName = propValue[key].type.displayName;
    if (!/ParallaxOnboardPage/.test(childComponentName)) {
      return new Error(
        `Invalid component '${childComponentName}' supplied to ${componentName}. Use 'ParallaxOnboardPage' instead.`
      );
    }

    return childComponentName;
  }),
  animatedValue: PropTypes.instanceOf(Value),
  speed: PropTypes.number,
  dividerWidth: PropTypes.number,
  dividerColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

ParallaxOnboard.defaultProps = {
  children: [<></>],
  animatedValue: new Value(0),
  speed: 0.5,
  dividerWidth: 1,
  dividerColor: 'black',
  backgroundColor: 'orange',
};

export default ParallaxOnboard;
