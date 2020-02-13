import React from 'react';
import { Image, Text, Dimensions } from 'react-native';

import { Value } from 'react-native-reanimated';
import {
  SafeAreaProvider,
  initialWindowSafeAreaInsets,
} from 'react-native-safe-area-context';

import { ParallaxOnboard, ParallaxOnboardPage } from './src';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

const backgroundImage0 =
  'https://images.unsplash.com/photo-1581610335641-940f37bb172f';
const backgroundImage1 =
  'https://images.unsplash.com/photo-1567705977291-f8f4342e2e9c';

const { width, height } = Dimensions.get('window');

const App = () => {
  const animatedValue = new Value(0);

  return (
    <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
      <ParallaxOnboard
        speed={0.5}
        animatedValue={animatedValue}
        dividerWidth={1}
        backgroundColor="black"
      >
        <ParallaxOnboardPage
          BackgroundComponent={
            <Image
              source={{ uri: backgroundImage0 }}
              style={{ width, height }}
            />
          }
          ForegroundComponent={<Text>slide 1</Text>}
        />
        <ParallaxOnboardPage
          BackgroundComponent={
            <Image
              source={{ uri: backgroundImage1 }}
              style={{ width, height }}
            />
          }
          ForegroundComponent={<Text>slide 2</Text>}
        />
      </ParallaxOnboard>
    </SafeAreaProvider>
  );
};

export default App;
