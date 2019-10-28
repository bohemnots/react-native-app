import MusicControl from 'react-native-music-control';
import React from 'react';
import ReactNative from 'react-native';
import Video from 'react-native-video';

import useMeta from '../hooks/useMeta';
import {streamURL} from '../config';

const {View, Image, TouchableOpacity, StyleSheet, Text} = ReactNative;

export default function Player(props) {
  const {onImageUpdate, onImageLoaded} = props;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const meta = useMeta(null);

  const toggle = () => console.log('toggle') || setIsPlaying(isP => !isP);

  const playIcon = require('../img/play.png');
  const pauseIcon = require('../img/pause.png');

  React.useEffect(() => {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);

    MusicControl.on('play', () => isPlaying || setIsPlaying(true));
    MusicControl.on('pause', () => isPlaying && setIsPlaying(false));
  });

  const name = meta.customName || meta.trackName;

  React.useEffect(() => {
    MusicControl.setNowPlaying({
      title: name,
      artwork: require('../img/red.png'),
    });
  }, [name]);

  let theme = styles.black;

  if (meta && meta.theme === 'light') {
    theme = styles.white;
  }

  if (meta && 'imgUrl' in meta) {
    onImageUpdate && onImageUpdate(meta.imgUrl);
  }

  return (
    <View>
      <TouchableOpacity onPress={toggle} style={styles.container}>
        <Image
          style={styles.action}
          source={isPlaying ? pauseIcon : playIcon}
          onLoad={onImageLoaded}
        />
        <View style={styles.meta}>
          <Text style={{...styles.name, ...theme}}>{name || ''}</Text>
          <Text style={{...styles.location, ...theme}}>
            {(meta && meta.location) || ''}
          </Text>
        </View>
      </TouchableOpacity>
      <Video
        playInBackground
        playWhenInactive
        allowsExternalPlayback
        ignoreSilentSwitch={'ignore'}
        source={{uri: streamURL}}
        paused={!isPlaying}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    resizeMode: 'contain',
    width: 50,
    height: 50,
    minWidth: 50,
    minHeight: 50,
  },
  meta: {
    flex: 4,
    height: 100,
  },
  name: {
    margin: 2,
    fontSize: 16,
  },
  location: {
    margin: 2,
    color: '#999',
  },
  white: {
    color: '#000',
    backgroundColor: '#fff',
  },
  black: {
    color: '#fff',
    backgroundColor: '#000',
  },
});
