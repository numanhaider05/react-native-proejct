/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const ProgressBar = (props: { isLoaded?: any; isNewStory?: any; next?: any; pause?: any; index?: any; currentIndex?: any; duration?: any; length?: any; active?: any; }) => {
  const { index, currentIndex, duration, length, active } = props;
  const [pauseTime, setPauseTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const scale = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);
  const [reload, setReload] = useState(false);

  const onLayoutAdded = (evt: any) => {
    setWidth(evt.width);
  };

  useEffect(() => {
    scale.setValue(0);
  }, [currentIndex])

  useEffect(() => {
    switch (active) {
      case 2:
        return scale.setValue(width);
      case 1:
        return props.isLoaded && !props.isNewStory ? Animated.timing(scale, {
          toValue: width,
          duration: getDuration(),
          easing: Easing.linear,
          useNativeDriver: false
        } as any).start(({ finished }) => {
          if (finished) props.next();
        })
          : scale.setValue(0);
      case 0:
        return scale.setValue(0);
      default:
        return scale.setValue(0);
    }
  });

  const getDuration = () => {
    const totalPlaytime = duration * 1000;

    if (props.pause) {
      return 50000;
    }

    if (pauseTime === null) {
      return totalPlaytime;
    }

    const lastTime = (pauseTime as any) - (startTime as any);
    return totalPlaytime - lastTime;
  };

  useEffect(() => {
    if (index === currentIndex) {
      if (props.pause) {
        const endtime = Date.now();
        console.log('endtime', endtime);
        setPauseTime(endtime as any);
      }

      if (startTime === null) {
        setStartTime(Date.now() as any);
      }
    }
  }, [props.pause]);


  return (
    <View onLayout={evt => onLayoutAdded(evt.nativeEvent.layout)} style={styles.container}>
      <Animated.View style={[styles.container, {
        width: scale,
        backgroundColor: index <= currentIndex ? 'white' : '#555',
        position: 'absolute',
        top: 0,
        margin: 0,
      }]}
      />
    </View>
  );
};

ProgressBar.propTypes = ({
  index: PropTypes.number,
  currentIndex: PropTypes.number,
});

const styles = StyleSheet.create({
  container: {
    height: 4,
    flex: 1,
    backgroundColor: '#555',
    margin: 2,
  },
});

export default ProgressBar;
