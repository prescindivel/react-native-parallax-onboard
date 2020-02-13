import styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import Animated from 'react-native-reanimated';

export const MainContainer = styled(SafeAreaView)`
  position: relative;
  flex: 1;
`;

export const ParallaxContainer = styled(Animated.ScrollView).attrs({})`
  flex: 1;
  width: ${props => `${props.pageWidth}px`};
  height: ${props => `${props.pageHeight}px`};
  background-color: ${props => `${props.backgroundColor}`};
`;

export const PageOuterContainer = styled.View`
  flex-direction: row;
  z-index: ${props => props.zIndex};
`;

export const PageDivider = styled.View`
  width: ${props => `${props.dividerWidth}px`};
  height: ${props => `${props.pageHeight}px`};
`;

export const Footer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

export const ActionsContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ArrowButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 12px 20px;
  opacity: ${props => (props.disabled ? '0' : '1')};
`;
