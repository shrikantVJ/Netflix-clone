import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { styles } from '@/styles';
import { FeaturedMovie } from '@/types/movie';

import { useTheme } from '@/contexts/ThemeContext';

interface FeaturedContentProps {
    movie: FeaturedMovie;
    imageStyle: any;
    categoriesStyle: any;
    buttonsStyle: any;
    topMargin: number;
}

export function FeaturedContent({
    movie,
    imageStyle,
    categoriesStyle,
    buttonsStyle,
    topMargin
}: FeaturedContentProps) {
    const { colorScheme } = useTheme();

    return (
        <View style={[styles.featuredContent, { marginTop: topMargin }]}>
            <View style={[styles.featuredWrapper, {
                borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'
            }]}>


                <View style={styles.featuredImageContainer}>
                    <Animated.Image
                        source={{ uri: movie.thumbnail }}
                        style={[styles.featuredImage, imageStyle]}
                    />
                    <LinearGradient
                        colors={colorScheme === 'dark'
                            ? ['transparent', 'rgba(0,0,0,0.8)']
                            : ['transparent', 'rgba(255,255,255,0.8)']}
                        style={styles.featuredGradient}
                    />
                    <Animated.Image source={{ uri: movie.logo }} style={styles.featuredLogo} />
                </View>

                <View style={styles.featuredOverlay}>
                    <Animated.View style={[styles.featuredCategories, categoriesStyle]}>
                        <Text style={[styles.categoriesText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
                            {movie.categories.join(' • ')}
                        </Text>
                    </Animated.View>

                    {/* <View
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, marginBottom: 2 }}>
                        <Animated.Image
                            source={{ uri: 'https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo.png' }}
                            style={{ width: 20, height: 20, top: -4, position: 'absolute', left: 0 }}
                        />
                        {movie.type && <Text style={styles.netflixTag}>{movie.type}</Text>}
                    </View> */}


                    <Animated.View style={[styles.featuredButtons, buttonsStyle]}>
                        <Pressable style={[styles.playButton, { backgroundColor: colorScheme === 'dark' ? '#fff' : '#000' }]}>
                            <Ionicons name="play" size={24} color={colorScheme === 'dark' ? "#000" : "#fff"} />
                            <Text style={[styles.playButtonText, { color: colorScheme === 'dark' ? '#000' : '#fff' }]}>Play</Text>
                        </Pressable>
                        <Pressable style={[styles.myListButton, { backgroundColor: colorScheme === 'dark' ? 'rgba(51, 51, 51, 0.9)' : 'rgba(0, 0, 0, 0.7)' }]}>
                            <Ionicons name="add" size={24} color="#fff" />
                            <Text style={styles.myListButtonText}>My List</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
} 