/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';

import Player from './components/Player';
import {defaultImg} from './config';

const App: () => React$Node = () => {
  const [back, setBack] = React.useState(defaultImg);

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image
          style={styles.art}
          source={{
            url: back,
          }}
        />
        <View style={styles.player}>
          <Player
            style={styles.player}
            onImageUpdate={newBack => setBack(newBack || defaultImg)}
            onImageLoaded={() => SplashScreen.hide()}
          />
        </View>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  art: {
    minHeight: '100%',
  },
  player: {
    top: -200,
    justifyContent: 'center',
  },
});
