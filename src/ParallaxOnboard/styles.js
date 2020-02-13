import styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import Animated from 'react-native-reanimated';

export const MainContainer = styled(SafeAreaView)`
  flex: 1;
`;

export const ParallaxContainer = styled(Animated.ScrollView)`
  width: ${props => `${props.pageWidth}px`};
  height: ${props => `${props.pageHeight}px`};
  padding-top: ${props => `${props.statusBarHeight}px`};
  background-color: ${props => props.backgroundColor || '#ff0'};
`;
