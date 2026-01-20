import { useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { DeviceMotionData } from '@/types/movie';
import { Platform } from 'react-native';

export function useDeviceMotion() {
    const tiltX = useSharedValue(0);
    const tiltY = useSharedValue(0);

    useEffect(() => {
        if (Platform.OS === 'android') return;

        const subscription = DeviceMotion.addListener((data: DeviceMotionData) => {
            tiltX.value = withSpring(data.rotation.gamma * 4);
            tiltY.value = withSpring(data.rotation.beta * 4);
        });

        DeviceMotion.setUpdateInterval(16);

        return () => {
            subscription.remove();
        };
    }, []);

    return { tiltX, tiltY };
} 