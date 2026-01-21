import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const FlashScreen = () => {
    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <Image
                source={require('../assets/splash_custom.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        width: width,
        height: height,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
