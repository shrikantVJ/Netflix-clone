import React from 'react';
import { Text, TextStyle, StyleSheet, View, StyleProp } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LiquidMetal } from './LiquidMetal';

interface LiquidMetalTextProps {
    text: string;
    style?: StyleProp<TextStyle>;
    intensity?: 'subtle' | 'medium' | 'strong';
    speed?: number;
    fontSize?: number;
}

export function LiquidMetalText({
    text,
    style,
    intensity = 'medium',
    speed = 4000
}: LiquidMetalTextProps) {
    const flatStyle = StyleSheet.flatten(style);

    return (
        <View style={{ position: 'relative' }}>
            <View style={{
                borderRadius: 8,
                overflow: 'hidden',
                paddingHorizontal: 4,
            }}>
                <LiquidMetal intensity={intensity} speed={speed} />
                <Text style={[
                    style,
                    {
                        color: '#ffffff',
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 3,
                        padding: 4,
                    }
                ]}>
                    {text}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});

