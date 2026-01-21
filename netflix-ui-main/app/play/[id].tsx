import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/contexts/ThemeContext';
import { LiquidMetal } from '@/components/LiquidMetal/LiquidMetal';
import { LiquidMetalText } from '@/components/LiquidMetal/LiquidMetalText';

const { width } = Dimensions.get('window');

export default function PlayScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colorScheme } = useTheme();
    const [isLaunching, setIsLaunching] = useState(false);

    // Dummy game data
    const game = {
        title: `Asphalt 9: Legends`,
        subtitle: 'Experience Premium Racing',
        rating: 4.5,
        downloads: '50M+',
        category: 'Racing',
        size: '2.1 GB',
        developer: 'Gameloft',
        releaseDate: '2024',
    };

    const handleLaunch = () => {
        setIsLaunching(true);
        setTimeout(() => {
            setIsLaunching(false);
        }, 2000);
    };

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <StatusBar style={colorScheme === 'dark' ? "light" : "dark"} />



            <ScrollView style={[styles.content]} showsVerticalScrollIndicator={false}>
                {/* Game Banner */}
                <View style={[styles.bannerContainer, { marginTop: insets.top + 60 }]}>
                    <View style={styles.bannerPlaceholder}>
                        <Ionicons name="game-controller" size={80} color="rgba(255,255,255,0.3)" />
                    </View>
                    <LinearGradient
                        colors={['transparent', '#000']}
                        style={styles.bannerGradient}
                    />
                </View>

                {/* Game Info */}
                <View style={styles.infoSection}>
                    <LiquidMetalText
                        text={game.title}
                        style={[styles.gameTitle, { fontSize: 32 }]}
                        intensity="strong"
                        speed={3500}
                    />
                    <Text style={styles.gameSubtitle}>{game.subtitle}</Text>

                    <View style={styles.metadata}>
                        <View style={styles.metadataItem}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text style={styles.metadataText}>{game.rating}</Text>
                        </View>
                        <Text style={styles.metadataDivider}>•</Text>
                        <Text style={styles.metadataText}>{game.downloads} downloads</Text>
                        <Text style={styles.metadataDivider}>•</Text>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingText}>12+</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <Pressable
                            style={[styles.playButton, isLaunching && styles.playButtonDisabled]}
                            onPress={handleLaunch}
                            disabled={isLaunching}
                        >
                            <Ionicons
                                name={isLaunching ? "hourglass-outline" : "play"}
                                size={24}
                                color="#fff"
                            />
                            <Text style={styles.playButtonText}>
                                {isLaunching ? 'Launching...' : 'Play Game'}
                            </Text>
                        </Pressable>
                        <Pressable style={styles.downloadButton}>
                            <Ionicons name="download-outline" size={24} color="#fff" />
                        </Pressable>
                    </View>

                    {/* Quick Info */}
                    <View style={styles.quickInfo}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Category</Text>
                            <Text style={styles.infoValue}>{game.category}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Size</Text>
                            <Text style={styles.infoValue}>{game.size}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Developer</Text>
                            <Text style={styles.infoValue}>{game.developer}</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About this game</Text>
                        <Text style={styles.description}>
                            Dive into the world of street racing with stunning graphics,
                            over 50 prestigious cars, and intense multiplayer races.
                            Customize your rides, master challenging tracks, and compete
                            with players worldwide. Experience the most realistic mobile
                            racing game with console-quality visuals and physics.
                        </Text>
                    </View>

                    {/* Features */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Game Features</Text>
                        <View style={styles.featuresList}>
                            <View style={styles.featureItem}>
                                <Ionicons name="checkmark-circle" size={20} color="#46d369" />
                                <Text style={styles.featureText}>60+ Cars from Top Manufacturers</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="checkmark-circle" size={20} color="#46d369" />
                                <Text style={styles.featureText}>Real-time Multiplayer Racing</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="checkmark-circle" size={20} color="#46d369" />
                                <Text style={styles.featureText}>Career Mode with 900+ Events</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="checkmark-circle" size={20} color="#46d369" />
                                <Text style={styles.featureText}>Customizable Vehicles</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="checkmark-circle" size={20} color="#46d369" />
                                <Text style={styles.featureText}>Stunning Visuals & Effects</Text>
                            </View>
                        </View>
                    </View>

                    {/* System Requirements */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Requirements</Text>
                        <View style={styles.requirementsList}>
                            <Text style={styles.requirementText}>• iOS 14.0 or later / Android 8.0+</Text>
                            <Text style={styles.requirementText}>• 2.1 GB free storage space</Text>
                            <Text style={styles.requirementText}>• Internet connection required</Text>
                            <Text style={styles.requirementText}>• Optional: Controller support</Text>
                        </View>
                    </View>

                    {/* What's New */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>What's New</Text>
                        <Text style={styles.versionText}>Version 1.5.0 • Jan 15, 2026</Text>
                        <Text style={styles.description}>
                            • New season: Tokyo Nights{'\n'}
                            • 5 new cars added{'\n'}
                            • Performance improvements{'\n'}
                            • Bug fixes and optimizations
                        </Text>
                    </View>

                    {/* Similar Games */}
                    <View style={styles.similarSection}>
                        <Text style={styles.sectionTitle}>More Games</Text>
                        <View style={styles.similarGrid}>
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <Pressable key={item} style={styles.similarCard}>
                                    <View style={styles.similarThumbnail}>
                                        <Ionicons name="game-controller" size={40} color="rgba(255,255,255,0.3)" />
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
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    },
    iconButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    bannerContainer: {
        height: 220,
        position: 'relative',
    },
    bannerPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    infoSection: {
        padding: 16,
    },
    gameTitle: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    gameSubtitle: {
        color: '#888',
        fontSize: 14,
        marginBottom: 12,
    },
    metadata: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    metadataItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metadataText: {
        color: '#ccc',
        fontSize: 13,
    },
    metadataDivider: {
        color: '#666',
        marginHorizontal: 8,
    },
    ratingBadge: {
        backgroundColor: '#333',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        color: '#fff',
        fontSize: 11,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    playButton: {
        flex: 1,
        backgroundColor: '#E50914',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 6,
        gap: 8,
    },
    playButtonDisabled: {
        backgroundColor: '#666',
    },
    playButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    downloadButton: {
        width: 50,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    quickInfo: {
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
    },
    infoLabel: {
        color: '#888',
        fontSize: 11,
        marginBottom: 4,
    },
    infoValue: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#333',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    description: {
        color: '#ccc',
        fontSize: 14,
        lineHeight: 22,
    },
    featuresList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    featureText: {
        color: '#ccc',
        fontSize: 14,
    },
    requirementsList: {
        gap: 8,
    },
    requirementText: {
        color: '#ccc',
        fontSize: 13,
    },
    versionText: {
        color: '#888',
        fontSize: 12,
        marginBottom: 8,
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
        height: 100,
        borderRadius: 8,
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
