import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/contexts/ThemeContext';

import { BlurView } from 'expo-blur';
import { LiquidMetal } from '@/components/LiquidMetal/LiquidMetal';
import { LiquidMetalText } from '@/components/LiquidMetal/LiquidMetalText';

const { width } = Dimensions.get('window');

export default function WatchScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colorScheme } = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Dummy data - in a real app, this would come from an API
    const content = {
        title: `Breaking Bad`,
        type: 'Series',
        year: '2008',
        seasons: 5,
        episodes: 62,
        rating: '18+',
        match: '98% Match',
        description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future. This gripping drama follows his transformation from a mild-mannered educator to a feared drug kingpin.',
        cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Dean Norris'],
        creator: 'Vince Gilligan',
        genres: ['Crime', 'Drama', 'Thriller'],
    };

    const episodes = [
        { id: 1, title: 'Pilot', duration: '58m', thumbnail: 'https://via.placeholder.com/200x112' },
        { id: 2, title: 'Cat\'s in the Bag...', duration: '48m', thumbnail: 'https://via.placeholder.com/200x112' },
        { id: 3, title: '...And the Bag\'s in the River', duration: '48m', thumbnail: 'https://via.placeholder.com/200x112' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <StatusBar style={colorScheme === 'dark' ? "light" : "dark"} />



            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Video Player */}
                <Pressable style={[styles.videoContainer, { marginTop: insets.top + 60 }]}>
                    <View style={styles.videoPlaceholder}>
                        <Ionicons
                            name={isPlaying ? "pause-circle" : "play-circle"}
                            size={70}
                            color="rgba(255,255,255,0.9)"
                            onPress={() => setIsPlaying(!isPlaying)}
                        />
                    </View>
                    <LinearGradient
                        colors={['transparent', '#000']}
                        style={styles.videoGradient}
                    />
                </Pressable>

                {/* Content Info */}
                <View style={styles.infoSection}>
                    {/* Title and Meta */}
                    <View style={styles.titleContainer}>
                        <LiquidMetalText
                            text={content.title}
                            style={[styles.title, { fontSize: 36, textAlign: 'center' }]}
                            intensity="strong"
                            speed={3500}
                        />
                    </View>
                    <View style={styles.metadata}>
                        <Text style={styles.matchScore}>{content.match}</Text>
                        <Text style={styles.metadataText}>{content.year}</Text>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingText}>{content.rating}</Text>
                        </View>
                        <Text style={styles.metadataText}>{content.seasons} Seasons</Text>
                        <View style={styles.hdBadge}>
                            <Text style={styles.hdText}>HD</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <Pressable style={styles.playButton}>
                            <Ionicons name="play" size={28} color="#000" />
                            <Text style={styles.playButtonText}>Play</Text>
                        </Pressable>
                        <Pressable style={styles.downloadButton}>
                            <Ionicons name="download-outline" size={28} color="#fff" />
                            <Text style={styles.downloadButtonText}>Download</Text>
                        </Pressable>
                    </View>

                    {/* Description */}
                    <Text
                        style={styles.description}
                        numberOfLines={showFullDescription ? undefined : 3}
                    >
                        {content.description}
                    </Text>
                    <Pressable onPress={() => setShowFullDescription(!showFullDescription)}>
                        <Text style={styles.moreText}>
                            {showFullDescription ? 'Show less' : 'More'}
                        </Text>
                    </Pressable>

                    {/* Cast & Crew */}
                    <View style={styles.castSection}>
                        <Text style={styles.castText}>
                            <Text style={styles.castLabel}>Cast: </Text>
                            {content.cast.join(', ')}
                        </Text>
                        <Text style={styles.castText}>
                            <Text style={styles.castLabel}>Creator: </Text>
                            {content.creator}
                        </Text>
                        <Text style={styles.castText}>
                            <Text style={styles.castLabel}>Genres: </Text>
                            {content.genres.join(', ')}
                        </Text>
                    </View>

                    {/* Quick Actions */}
                    <View style={styles.quickActions}>
                        <Pressable style={styles.actionButton}>
                            <Ionicons name="add" size={24} color="#fff" />
                            <Text style={styles.actionLabel}>My List</Text>
                        </Pressable>
                        <Pressable style={styles.actionButton}>
                            <Ionicons name="thumbs-up-outline" size={24} color="#fff" />
                            <Text style={styles.actionLabel}>Rate</Text>
                        </Pressable>
                        <Pressable style={styles.actionButton}>
                            <Ionicons name="share-social-outline" size={24} color="#fff" />
                            <Text style={styles.actionLabel}>Share</Text>
                        </Pressable>
                    </View>

                    {/* Episodes Section */}
                    <View style={styles.episodesSection}>
                        <View style={styles.episodesHeader}>
                            <Text style={styles.sectionTitle}>Episodes</Text>
                            <Pressable style={styles.seasonSelector}>
                                <Text style={styles.seasonText}>Season 1</Text>
                                <Ionicons name="chevron-down" size={20} color="#fff" />
                            </Pressable>
                        </View>

                        {episodes.map((episode) => (
                            <Pressable key={episode.id} style={styles.episodeCard}>
                                <View style={styles.episodeThumbnail}>
                                    <View style={styles.thumbnailPlaceholder}>
                                        <Ionicons name="play-circle" size={32} color="rgba(255,255,255,0.7)" />
                                    </View>
                                    <Text style={styles.episodeDuration}>{episode.duration}</Text>
                                </View>
                                <View style={styles.episodeInfo}>
                                    <View style={styles.episodeTitleRow}>
                                        <Text style={styles.episodeNumber}>{episode.id}</Text>
                                        <Text style={styles.episodeTitle}>{episode.title}</Text>
                                    </View>
                                    <Text style={styles.episodeDescription} numberOfLines={2}>
                                        Walter White transforms from high school teacher to criminal mastermind.
                                    </Text>
                                </View>
                                <Pressable style={styles.downloadIconButton}>
                                    <Ionicons name="download-outline" size={24} color="#fff" />
                                </Pressable>
                            </Pressable>
                        ))}
                    </View>

                    {/* Similar Content */}
                    <View style={styles.similarSection}>
                        <Text style={styles.sectionTitle}>More Like This</Text>
                        <View style={styles.similarGrid}>
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <Pressable key={item} style={styles.similarCard}>
                                    <View style={styles.similarThumbnail}>
                                        <Ionicons name="film" size={40} color="rgba(255,255,255,0.3)" />
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Header with Glassmorphism - positioned on top */}
            <BlurView
                intensity={80}
                tint={colorScheme === 'dark' ? 'dark' : 'light'}
                style={[styles.header, {
                    paddingTop: insets.top,
                    backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'
                }]}
            >
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </Pressable>
                <View style={{ flex: 1 }} />
                <Pressable style={styles.iconButton}>
                    <Ionicons name="search" size={24} color="#fff" />
                </Pressable>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 10,
        zIndex: 10,
        overflow: 'hidden',
    },
    backButton: {
        padding: 4,
    },
    headerInfo: {
        flex: 1,
        alignItems: 'center',
    },
    headerSubtitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    iconButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    videoContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#1a1a1a',
        position: 'relative',
    },
    videoPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    infoSection: {
        padding: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    metadata: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    matchScore: {
        color: '#46d369',
        fontSize: 14,
        fontWeight: '600',
    },
    metadataText: {
        color: '#ccc',
        fontSize: 14,
    },
    ratingBadge: {
        backgroundColor: '#333',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        color: '#fff',
        fontSize: 12,
    },
    hdBadge: {
        borderWidth: 1,
        borderColor: '#888',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 2,
    },
    hdText: {
        color: '#888',
        fontSize: 10,
        fontWeight: '600',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    playButton: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 6,
        gap: 8,
    },
    playButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
    },
    downloadButton: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 6,
        gap: 8,
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    description: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 8,
    },
    moreText: {
        color: '#888',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 20,
    },
    castSection: {
        gap: 8,
        marginBottom: 24,
    },
    castText: {
        color: '#ccc',
        fontSize: 13,
        lineHeight: 18,
    },
    castLabel: {
        color: '#888',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#2a2a2a',
        marginBottom: 24,
    },
    actionButton: {
        alignItems: 'center',
        gap: 8,
    },
    actionLabel: {
        color: '#ccc',
        fontSize: 12,
    },
    episodesSection: {
        marginBottom: 32,
    },
    episodesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    seasonSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
    },
    seasonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    episodeCard: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 12,
    },
    episodeThumbnail: {
        width: 140,
        height: 80,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
    },
    thumbnailPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    episodeDuration: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 2,
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
    },
    episodeInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    episodeTitleRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 6,
    },
    episodeNumber: {
        color: '#888',
        fontSize: 14,
        fontWeight: '600',
    },
    episodeTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    episodeDescription: {
        color: '#ccc',
        fontSize: 12,
        lineHeight: 16,
    },
    downloadIconButton: {
        padding: 8,
        justifyContent: 'center',
    },
    similarSection: {
        marginBottom: 32,
    },
    similarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12,
    },
    similarCard: {
        width: (width - 48) / 3,
        aspectRatio: 2 / 3,
        borderRadius: 4,
        overflow: 'hidden',
    },
    similarThumbnail: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
