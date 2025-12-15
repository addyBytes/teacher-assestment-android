import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Animated,
  Easing,
} from "react-native";
import { animationStyles } from "./loading.animation.styles";

export default function Loading() {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerWidth === 0) return; // wait until width is measured

    progressAnim.setValue(0);

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: containerWidth,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(progressAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [containerWidth]);

  return (
    <View className="flex-1 bg-[#FFF6EC]">
      
      {/* Top Static Geometric Image */}
      <View className="flex-1 justify-end items-start pl-6 pb-4">
        <Image
          source={require("../../assets/images/geometric.png")}
          resizeMode="contain"
          className="w-36 h-36"
        />
      </View>

      {/* Bottom Section */}
      <View className="px-6 pb-8">
        
        {/* Loading Bar */}
        <View
          style={animationStyles.progressContainer}
          onLayout={(e) => {
            setContainerWidth(e.nativeEvent.layout.width);
          }}
        >
          <Animated.View
            style={[
              animationStyles.progressBar,
              { width: progressAnim },
            ]}
          />
        </View>

        {/* Text Image */}
        <View className="mt-4 items-start">
          <Image
            source={require("../../assets/images/loadingText.png")}
            resizeMode="contain"
            className="h-5"
          />
        </View>

      </View>
    </View>
  );
}
