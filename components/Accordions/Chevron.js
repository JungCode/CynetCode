import { View } from "react-native";
import { Icon } from "react-native-paper";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

function Chevron({ progress,style }) {
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * -180}deg` }],
  }));
  return (
    <Animated.View style={iconStyle}>
      <Icon source="chevron-down" size={30} />
    </Animated.View>
  );
}

export default Chevron;
