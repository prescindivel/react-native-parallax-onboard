/* eslint-disable react/require-default-props */
import React from 'react';

import { interpolate, Value } from 'react-native-reanimated';

import { useSafeArea } from 'react-native-safe-area-context';

import PropTypes from 'prop-types';

import { Container, ForegroundContainer, BackgroundContainer } from './styles';

const ParallaxOnboardPage = ({
  index,
  speed,
  animatedValue,
  pageWidth,
  dividerWidth,
  BackgroundComponent,
  ForegroundComponent,
}) => {
  const insets = useSafeArea();

  const getParallaxStyles = i => {
    const totalPageWidth = pageWidth + dividerWidth;
    const horizontalSpeed =
      dividerWidth === 0
        ? Math.abs(pageWidth * speed - pageWidth)
        : Math.abs(pageWidth * speed - dividerWidth - pageWidth);

    const animation = {
      transform: [
        {
          translateX: interpolate(animatedValue, {
            inputRange: [
              (i - 1) * totalPageWidth,
              i * (pageWidth + dividerWidth),
              (i + 1) * totalPageWidth,
            ],
            outputRange: [-horizontalSpeed, 0, horizontalSpeed],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    if (speed === 1) {
      return {};
    }

    return animation;
  };

  return (
    <Container>
      <BackgroundContainer style={getParallaxStyles(index)}>
        {BackgroundComponent}
      </BackgroundContainer>

      <ForegroundContainer
        paddingTop={insets.top}
        paddingBottom={insets.bottom}
        pointerEvents="box-none"
      >
        {ForegroundComponent}
      </ForegroundContainer>
    </Container>
  );
};

ParallaxOnboardPage.propTypes = {
  index: PropTypes.number,
  speed: PropTypes.number,
  animatedValue: PropTypes.instanceOf(Value),
  pageWidth: PropTypes.number,
  dividerWidth: PropTypes.number,
  BackgroundComponent: PropTypes.element,
  ForegroundComponent: PropTypes.element,
};

ParallaxOnboardPage.defaultProps = {};

// ParallaxOnboardPage.defaultProps = {
//   index: PropTypes.number,
//   speed: PropTypes.number,
//   animatedValue: PropTypes.instanceOf(Value),
//   pageWidth: PropTypes.number,
//   dividerWidth: PropTypes.number,
//   BackgroundComponent: PropTypes.element,
//   ForegroundComponent: PropTypes.element,
// };

export default ParallaxOnboardPage;
