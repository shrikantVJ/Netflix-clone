import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Text,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import moviesData from '../data/movies.json';
import { useDebounce } from 'use-debounce';
import { useTheme } from '@/contexts/ThemeContext';
import { LiquidMetal } from '@/components/LiquidMetal/LiquidMetal';
import { LiquidMetalText } from '@/components/LiquidMetal/LiquidMetalText';

const { width } = Dimensions.get('window');
const GAME_CARD_WIDTH = width / 3 - 16;

export default function Search() {
    // Get mobile games and TV shows/movies
    const mobileGames = moviesData.movies[0].movies;
    const tvAndMovies = moviesData.movies[5].movies;

    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredGames, setFilteredGames] = useState(mobileGames);
    const [filteredShows, setFilteredShows] = useState(tvAndMovies);
    const [debouncedSearchTerm] = useDebounce(searchQuery, 500);
    const inputRef = useRef<TextInput>(null);
    const router = useRouter();
    const { colorScheme } = useTheme();

    useEffect(() => {
        if (debouncedSearchTerm !== searchQuery) {
            setIsLoading(true);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!debouncedSearchTerm.trim()) {
            setFilteredGames(mobileGames);
            setFilteredShows(tvAndMovies);
            setIsLoading(false);
            return;
        }

        const searchText = debouncedSearchTerm.toLowerCase();
        const matchedGames = mobileGames.filter(game =>
            game.title.toLowerCase().includes(searchText)
        );
        const matchedShows = tvAndMovies.filter(show =>
            show.title.toLowerCase().includes(searchText)
        );

        setFilteredGames(matchedGames);
        setFilteredShows(matchedShows);
        setIsLoading(false);
    }, [debouncedSearchTerm]);

    const NoResultsView = () => (
        <View style={styles.noResults}>
            <Text style={styles.noResultsTitle}>Oh darn. We don't have that.</Text>
            <Text style={styles.noResultsSubtitle}>
                Try searching for another movie, show, actor, director, or genre.
            </Text>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={colorScheme === 'dark' ? "white" : "black"} />
                </TouchableOpacity>
                <View style={[styles.searchInputContainer, { backgroundColor: colorScheme === 'dark' ? '#323232' : 'rgba(0,0,0,0.05)' }]}>
                    <Ionicons name="search" size={20} color={colorScheme === 'dark' ? "#666" : "#999"} style={styles.searchIcon} />
                    <TextInput
                        ref={inputRef}
                        style={[styles.searchInput, { color: colorScheme === 'dark' ? 'white' : 'black' }]}
                        placeholder="Search games, shows, movies..."
                        placeholderTextColor={colorScheme === 'dark' ? "#6b6b6b" : "#999"}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color={colorScheme === 'dark' ? "#666" : "#999"} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {isLoading ? (
                <View style={[styles.loaderContainer, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
                    <ActivityIndicator size="large" color={colorScheme === 'dark' ? "#fff" : "#000"} />
                </View>
            ) : searchQuery.trim() !== '' && filteredGames.length === 0 && filteredShows.length === 0 ? (
                <NoResultsView />
            ) : (
                <ScrollView style={styles.content}>
                    {/* Mobile Games Section - only show if there are games */}
                    {filteredGames.length > 0 && (
                        <View style={styles.section}>
                            <View style={{ marginBottom: 10 }}>
                                <LiquidMetalText
                                    text={searchQuery.trim() ? 'Top Results - Games' : 'Recommended Mobile Games'}
                                    style={styles.sectionTitle}
                                    intensity="medium"
                                />
                            </View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.gamesRow}
                            >
                                {filteredGames.map((game, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.gameCard}
                                        onPress={() => router.push(`/movie/${game.id}`)}
                                    >
                                        <Image
                                            source={{ uri: game.imageUrl }}
                                            style={[
                                                styles.gameImage,
                                                {
                                                    borderWidth: 1,
                                                    borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
                                                }
                                            ]}
                                        />
                                        <Text style={[styles.gameTitle, { color: colorScheme === 'dark' ? 'white' : 'black' }]} numberOfLines={2}>
                                            {game.title}
                                        </Text>
                                        <Text style={styles.gameType}>
                                            {game.type}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* TV Shows & Movies Section - only show if there are shows */}
                    {filteredShows.length > 0 && (
                        <View style={styles.section}>
                            <View style={{ marginBottom: 10 }}>
                                <LiquidMetalText
                                    text={searchQuery.trim() ? 'Top Results - Movies & TV' : 'Top TV Shows & Movies'}
                                    style={styles.sectionTitle}
                                    intensity="medium"
                                />
                            </View>
                            <View style={styles.showsList}>
                                {filteredShows.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.showItem}
                                        onPress={() => router.push(`/movie/${item.id}`)}
                                    >
                                        <Image
                                            source={{ uri: item.imageUrl }}
                                            style={[
                                                styles.showImage,
                                                {
                                                    borderWidth: 1,
                                                    borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
                                                }
                                            ]}
                                        />
                                        <View style={styles.showInfo}>
                                            <Text style={[styles.showTitle, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{item.title}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.playButton}>
                                            <Ionicons name="play-circle-outline" size={32} color={colorScheme === 'dark' ? "white" : "black"} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginTop: 10,
    },
    backButton: {
        marginRight: 12,
    },
    searchInputContainer: {
        flex: 1,
        height: 32,
        backgroundColor: '#323232',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    content: {
        flex: 1,
    },
    section: {
        paddingVertical: 16,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    gamesRow: {
        paddingHorizontal: 16,
        gap: 12,
    },
    gameCard: {
        width: GAME_CARD_WIDTH,
    },
    gameImage: {
        width: GAME_CARD_WIDTH,
        height: GAME_CARD_WIDTH,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    gameTitle: {
        color: 'white',
        fontSize: 14,
        marginTop: 8,
        fontWeight: 'bold',
    },
    gameType: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    showsList: {
        paddingHorizontal: 16,
    },
    showItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    showImage: {
        width: 150,
        height: 80,
        borderRadius: 4,
        backgroundColor: '#333',
    },
    showInfo: {
        flex: 1,
        marginLeft: 12,
    },
    showTitle: {
        color: 'white',
        fontSize: 16,
    },
    playButton: {
        padding: 8,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    noResults: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 80,
    },
    noResultsTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    noResultsSubtitle: {
        color: '#6b6b6b',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
});
