import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withRepeat,
    withTiming,
    Easing,
    interpolate,
} from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface LiquidMetalProps {
    style?: any;
    intensity?: 'subtle' | 'medium' | 'strong';
    speed?: number;
    children?: React.ReactNode;
}

export function LiquidMetal({
    style,
    intensity = 'medium',
    speed = 4000,
    children
}: LiquidMetalProps) {
    const { colorScheme } = useTheme();
    const anim1 = useSharedValue(0);
    const anim2 = useSharedValue(0);

    useEffect(() => {
        anim1.value = withRepeat(
            withTiming(1, {
                duration: speed,
                easing: Easing.inOut(Easing.sin),
            }),
            -1,
            true
        );
        anim2.value = withRepeat(
            withTiming(1, {
                duration: speed * 1.5,
                easing: Easing.inOut(Easing.sin),
            }),
            -1,
            true
        );
    }, [speed]);

    const animatedProps1 = useAnimatedProps(() => {
        return {
            start: {
                x: interpolate(anim1.value, [0, 1], [0, 0.5]),
                y: interpolate(anim2.value, [0, 1], [0, 1])
            },
            end: {
                x: interpolate(anim2.value, [0, 1], [1, 0.5]),
                y: interpolate(anim1.value, [0, 1], [1, 0])
            },
        };
    });

    const animatedProps2 = useAnimatedProps(() => {
        return {
            start: {
                x: interpolate(anim2.value, [0, 1], [1, 0.5]),
                y: interpolate(anim1.value, [0, 1], [0, 1])
            },
            end: {
                x: interpolate(anim1.value, [0, 1], [0, 0.5]),
                y: interpolate(anim2.value, [0, 1], [1, 0])
            },
        };
    });

    const getColors = (isSecondary = false) => {
        const darkColors = {
            // Brighter "Mercury/Silver" for high contrast on dark backgrounds
            subtle: ['#333333', '#4a4a4a', '#666666', '#4a4a4a', '#333333'],
            medium: ['#222222', '#555555', '#999999', '#555555', '#222222'],
            strong: ['#1a1a1a', '#777777', '#ffffff', '#777777', '#1a1a1a'], // Chrome effect
        };
        const lightColors = {
            subtle: ['#f8f8fa', '#e8e8f0', '#dadce0', '#e8e8f0', '#f8f8fa'],
            medium: ['#e0e0e0', '#c0c0c0', '#a0a0a0', '#c0c0c0', '#e0e0e0'],
            strong: ['#cccccc', '#aaaaaa', '#888888', '#aaaaaa', '#cccccc'],
        };

        const palette = colorScheme === 'dark' ? darkColors : lightColors;
        const colors = palette[intensity];

        if (isSecondary) {
            // Shift colors for the second layer
            return [...colors].reverse();
        }
        return colors;
    };

    return (
        <View style={[StyleSheet.absoluteFillObject, style]}>
            <AnimatedLinearGradient
                colors={getColors()}
                style={StyleSheet.absoluteFill}
                animatedProps={animatedProps1}
            />
            <AnimatedLinearGradient
                colors={getColors(true)}
                style={[StyleSheet.absoluteFill, { opacity: 0.4 }]}
                animatedProps={animatedProps2}
            />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({});
