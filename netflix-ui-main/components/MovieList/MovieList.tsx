import React from 'react';
import { View, Text, Pressable, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles';
import { Movie, MovieRow } from '@/types/movie';
import { useVisionOS } from '@/hooks/useVisionOS';
import { HoverableView } from '@/components/ui/VisionContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { LiquidMetalText } from '../LiquidMetal/LiquidMetalText';

const NumberBackground = ({ number }: { number: number }) => {
    const num = (number).toString().padStart(2, '0');

    return (
        <View style={styles.numberContainer}>
            <Text style={[styles.numberText, {
                color: 'white',
                opacity: 0.15,
                fontSize: 200,
                fontFamily: 'arialic',
            }]}>{num}</Text>
        </View>
    );
};

const MovieItem = ({ item, router, index, isTop10, colorScheme }: {
    item: Movie;
    router: any;
    index: number;
    isTop10: boolean;
    colorScheme: 'light' | 'dark';
}) => (
    <Pressable
        onPress={() => router.push({
            pathname: '/watch/[id]',
            params: { id: item.id }
        })}
        style={[
            styles.contentItem,
            isTop10 && styles.top10Item
        ]}
    >
        {isTop10 && <NumberBackground number={index + 1} />}
        <Image
            source={{ uri: item.imageUrl }}
            style={[
                styles.thumbnail,
                isTop10 && styles.top10Thumbnail,
                {
                    borderWidth: 1,
                    borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'
                }
            ]}
        />
    </Pressable>
);

export function MovieList({ rowTitle, movies, type }: MovieRow) {
    const router = useRouter();
    const isTop10 = type === 'top_10';
    const { isVisionOS } = useVisionOS();
    const { colorScheme } = useTheme();

    const renderItem = ({ item, index }: { item: Movie; index: number }) => (
        <HoverableView key={`${item.id}-${index}`} style={{}}>
            <MovieItem
                item={item}
                router={router}
                index={index}
                isTop10={isTop10}
                colorScheme={colorScheme}
            />
        </HoverableView>
    );

    return (
        <View style={styles.movieRow}>
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
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                    styles.contentList,
                    isTop10 && styles.top10List
                ]}
            />
        </View>
    );
}