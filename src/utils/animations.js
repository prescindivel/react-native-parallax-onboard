import { event } from 'react-native-reanimated';

export const onScroll = animatedValue =>
  event(
    [
      {
        nativeEvent: { contentOffset: { x: animatedValue } },
      },
    ],
    { useNativeDriver: true }
  );
