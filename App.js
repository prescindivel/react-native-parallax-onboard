import React from 'react';
import { Text } from 'react-native';
import { Value } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ParallaxOnboard, ParallaxOnboardPage } from './src';

const App = () => {
  const animatedValue = new Value(0);

  return (
    <SafeAreaProvider>
      <ParallaxOnboard
        speed={0.5}
        animatedValue={animatedValue}
        dividerWidth={1}
      >
        <Text>Hello</Text>
      </ParallaxOnboard>
    </SafeAreaProvider>
  );
};

export default App;
