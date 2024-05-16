// SlotMachine.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const SlotMachine = ({ text }) => {
  const animatedValues = text.split('').map(() => useSharedValue(0));

  useEffect(() => {
    animatedValues.forEach((value, index) => {
      value.value = withTiming(-(alphabet.length - 1) * 40, {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
        delay: index * 100, 
      });
    });
  }, [animatedValues]);

  return (
    <View style={styles.container}>
      {text.split('').map((char, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [{ translateY: animatedValues[index].value }],
          };
        });

        return (
          <View key={index} style={styles.slotContainer}>
            <Animated.View style={[styles.slot, animatedStyle]}>
              {alphabet.split('').map((letter, letterIndex) => (
                <Text key={letterIndex} style={styles.text}>{letter}</Text>
              ))}
              <Text style={styles.text}>{char}</Text> {/* Chữ cái đích */}
            </Animated.View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotContainer: {
    height: 40,
    overflow: 'hidden',
  },
  slot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    height: 40,
  },
});

export default SlotMachine;
