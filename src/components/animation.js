import React, { useEffect, useRef } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { Platform, Text } from 'react-native';

export default function Animation({
  source,
  style,
  onAnimationFinish,
  autoplay = true,
  loop = true,
  speed,
  resizeMode
}) {
  // temp ios fix begin
  // @see https://github.com/lottie-react-native/lottie-react-native/issues/832
  const lottieRef = useRef(null);
  useEffect(() => {
    lottieRef.current?.reset();
    setTimeout(() => {
      lottieRef.current?.play();
    }, 0);
  }, []);
  // fix end

  return Platform.OS !== 'web' ? (
    <AnimatedLottieView
      source={source}
      autoPlay={autoplay}
      loop={loop}
      style={style}
      speed={speed}
      onAnimationFinish={onAnimationFinish}
      ref={lottieRef}
      resizeMode={resizeMode}
    />
  ) : (
    <Text>An animation is supposed to be here</Text>
  );
}
