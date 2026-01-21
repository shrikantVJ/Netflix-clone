import React from 'react';
import { View, Text, Pressable, Image, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { LiquidMetalText } from '../LiquidMetal/LiquidMetalText';
import { useRouter } from 'expo-router';
import { styles } from '@/styles';
import { Movie, MovieRow } from '@/types/movie';

import { useTheme } from '@/contexts/ThemeContext';

const GameItem = ({ item, router, colorScheme }: { item: Movie; router: any; colorScheme: 'light' | 'dark' }) => (
    <Pressable
        onPress={() => router.push({
            pathname: '/play/[id]',
            params: { id: item.id }
        })}
        style={styles.contentItem}
    >
        <Image
            source={{ uri: item.imageUrl }}
            style={[
                styles.thumbnail,
                {
                    width: 120, aspectRatio: 1,
                    borderWidth: 1,
                    borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'
                }
            ]}
        />
        <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{item.title}</Text>
        <Text style={styles.type}>{item.type}</Text>
    </Pressable>
);

export function GameList({ rowTitle, movies }: MovieRow) {
    const router = useRouter();
    const { colorScheme } = useTheme();

    return (
        <View style={styles.contentList}>
            <View style={{ marginBottom: 10, marginLeft: 20 }}>
                <LiquidMetalText
                    text={rowTitle}
                    style={styles.sectionTitle}
                    intensity="medium"
                />
            </View>
            <FlatList
                horizontal
                data={movies}
                renderItem={(props) => <GameItem {...props} router={router} colorScheme={colorScheme} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
            />
        </View>
    );
} 