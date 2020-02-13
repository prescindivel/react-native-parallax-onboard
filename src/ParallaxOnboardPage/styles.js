import styled from 'styled-components/native';

import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  overflow: hidden;
`;

export const ForegroundContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const BackgroundContainer = styled(Animated.View)`
  opacity: 0.7;
`;
