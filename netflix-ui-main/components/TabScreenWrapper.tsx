import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    withSpring,
    runOnJS
} from 'react-native-reanimated';
import { usePathname, useNavigation } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    isActive: boolean;
    slideDirection: 'left' | 'right';
}

export function TabScreenWrapper({ children, isActive, slideDirection }: React.PropsWithChildren<Props>) {
    const [hasInitialized, setHasInitialized] = useState(false);

    // Simplified logic: Always render the wrapper to prevent re-mounting

    // Initial fetch of state
    const translateX = useSharedValue(isActive ? 0 : (slideDirection === 'left' ? -25 : 25));
    const opacity = useSharedValue(isActive ? 1 : 0);
    // const [isAnimating, setIsAnimating] = useState(false); // Removed state to prevent extra renders

    useEffect(() => {
        // Trigger initial animation
        if (!hasInitialized && isActive) {
            translateX.value = 0; // Start at 0 if active initially
            opacity.value = 1;
            setHasInitialized(true);
            return;
        }

        if (isActive) {
            translateX.value = withSpring(0, {
                damping: 25,
                stiffness: 120,
                mass: 0.5
            });
            opacity.value = withTiming(1, { duration: 200 }); // Slightly slower for smoothness
        } else {
            translateX.value = withSpring(slideDirection === 'left' ? -20 : 20, {
                damping: 25,
                stiffness: 120,
                mass: 0.5
            });
            opacity.value = withTiming(0, { duration: 150 });
        }
    }, [isActive, slideDirection]);

    const animatedStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: [{ translateX: translateX.value }],
        opacity: opacity.value,
    }));

    // Always return the same structure
    const { colorScheme } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
            <Animated.View style={[{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
            }, animatedStyle]}>
                {children}
            </Animated.View>
        </View>
    );
} 