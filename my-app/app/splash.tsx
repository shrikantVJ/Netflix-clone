import { ResizeMode, Video } from 'expo-av';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function SplashScreen() {
    const video = useRef<Video>(null);
    const [hasNavigated, setHasNavigated] = useState(false);

    const handlePlaybackStatusUpdate = (status: any) => {
        // When video finishes playing, navigate to landing page
        if (status.didJustFinish && !hasNavigated) {
            setHasNavigated(true);
            router.replace('/landing');
        }
    };

    const handleError = (error: string) => {
        console.error('Video playback error:', error);
        // Navigate to landing page even if video fails
        if (!hasNavigated) {
            setHasNavigated(true);
            setTimeout(() => {
                router.replace('/landing');
            }, 1000);
        }
    };

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                source={require('@/assets/video/Netflix.mp4')}
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
                isLooping={false}
                onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                onError={handleError}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    },
});
