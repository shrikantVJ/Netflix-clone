import { fetchMovieDetails, getImageUrl, getOriginalImageUrl } from '@/app/services/tmdb';
import EpisodeCard from '@/components/EpisodeCard';
import { Feather, FontAwesome5, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

// Mock data to replicate reference UI behavior until we have full season/episode API integration
const MOCK_EPISODES = [
    { id: '1', title: 'Pilot', duration: '58m', plot: 'Matches start to burn as high school chemistry teacher Walter White transforms into a meth-making kingpin.', poster: null },
    { id: '2', title: 'Cat\'s in the Bag...', duration: '48m', plot: 'Walt and Jesse attempt to tie up loose ends. The situation gets stickier.', poster: null },
    { id: '3', title: '...And the Bag\'s in the River', duration: '48m', plot: 'Walter fights with his decision to kill Krazy-8. Meanwhile, Marie believes Jr. is smoking pot.', poster: null },
];

export default function MovieDetailsScreen() {
    const { id, type } = useLocalSearchParams();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'Episodes' | 'MoreLikeThis'>('Episodes');
    const [isMuted, setIsMuted] = useState(false);
    const [myList, setMyList] = useState(false);
    const [rated, setRated] = useState(false);

    useEffect(() => {
        const loadDetails = async () => {
            if (id) {
                const data = await fetchMovieDetails(id as string, (type as string) || 'movie');
                setMovie(data);
            }
            setLoading(false);
        };
        loadDetails();
    }, [id]);

    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <StatusBar style="light" />
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );
    }

    if (!movie) {
        return (
            <View style={[styles.container, styles.center]}>
                <StatusBar style="light" />
                <Text style={{ color: '#fff' }}>Could not load details.</Text>
                <Pressable onPress={handleBack} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#E50914' }}>Go Back</Text>
                </Pressable>
            </View>
        );
    }

    const isTV = (type === 'tv' || movie.media_type === 'tv' || !!movie.number_of_seasons);
    const year = movie.release_date ? movie.release_date.split('-')[0] : (movie.first_air_date ? movie.first_air_date.split('-')[0] : '');
    const durationText = isTV
        ? `${movie.number_of_seasons} Season${movie.number_of_seasons > 1 ? 's' : ''}`
        : (movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '');

    // Fallback logic for episodes if real data isn't fully wired yet
    // In a real app we would fetch season details. For now we use the mock or what's available.
    const episodes = isTV ? MOCK_EPISODES.map(e => ({ ...e, poster: getImageUrl(movie.backdrop_path) })) : [];

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>

                {/* Header - Sticky */}
                <View style={styles.header}>
                    <Pressable onPress={handleBack} style={styles.headerBtn}>
                        <Feather name="chevron-left" size={28} color="white" />
                    </Pressable>
                    <Pressable style={styles.headerBtn}>
                        <MaterialIcons name="cast" size={24} color="white" />
                    </Pressable>
                </View>

                {/* Trailer / Hero View */}
                <View style={styles.videoContainer}>
                    <Image
                        source={{ uri: getOriginalImageUrl(movie.backdrop_path || movie.poster_path) }}
                        style={styles.videoPreview}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.3)']}
                        style={StyleSheet.absoluteFill}
                    />

                    {/* Play Overlay */}
                    <Pressable style={styles.playOverlay}>
                        <Ionicons name="play" size={40} color="white" style={{ marginLeft: 4 }} />
                    </Pressable>

                    <Pressable
                        style={styles.muteBtn}
                        onPress={() => setIsMuted(!isMuted)}
                    >
                        <Octicons name={isMuted ? "mute" : "unmute"} size={20} color="white" />
                    </Pressable>
                </View>

                {/* Info Section */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{movie.title || movie.name}</Text>

                    <View style={styles.statsRow}>
                        <Text style={styles.match}>98% Match</Text>
                        <Text style={styles.year}>{year}</Text>
                        <View style={styles.ageBadge}>
                            <Text style={styles.ageText}>{movie.adult ? '18+' : '12+'}</Text>
                        </View>
                        <Text style={styles.duration}>{durationText}</Text>
                        {/* HD Icon */}
                        <MaterialIcons name="hd" size={24} color="white" style={{ opacity: 0.8 }} />
                    </View>

                    {/* Main Actions */}
                    <Pressable style={styles.pkgPlayBtn}>
                        <Ionicons name="play" size={24} color="black" />
                        <Text style={styles.pkgPlayText}>Play</Text>
                    </Pressable>

                    <Pressable style={styles.pkgDownloadBtn}>
                        <Octicons name="download" size={20} color="white" />
                        <Text style={styles.pkgDownloadText}>Download</Text>
                    </Pressable>

                    <Text style={styles.description} numberOfLines={4}>
                        {movie.overview}
                    </Text>

                    {movie.credits?.cast && (
                        <Text style={styles.subText} numberOfLines={1}>
                            <Text style={{ color: '#777' }}>Cast: </Text>
                            {movie.credits.cast.slice(0, 4).map((c: any) => c.name).join(', ')}
                        </Text>
                    )}
                    {movie.created_by && movie.created_by.length > 0 && (
                        <Text style={styles.subText} numberOfLines={1}>
                            <Text style={{ color: '#777' }}>Creator: </Text>
                            {movie.created_by.map((c: any) => c.name).join(', ')}
                        </Text>
                    )}

                    {/* Action Bar */}
                    <View style={styles.actionBar}>
                        <Pressable style={styles.actionBtn} onPress={() => setMyList(!myList)}>
                            <Octicons name={myList ? "check" : "plus"} size={24} color="white" />
                            <Text style={styles.actionLabel}>My List</Text>
                        </Pressable>
                        <Pressable style={styles.actionBtn} onPress={() => setRated(!rated)}>
                            <FontAwesome5 name="thumbs-up" size={22} color={rated ? "#E50914" : "white"} solid={rated} />
                            <Text style={styles.actionLabel}>Rate</Text>
                        </Pressable>
                        <Pressable style={styles.actionBtn}>
                            <Feather name="share" size={24} color="white" />
                            <Text style={styles.actionLabel}>Share</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Tab Selector (Episodes / More Like This) */}
                {isTV && (
                    <View style={styles.tabContainer}>
                        <View style={styles.tabBorderTop} />
                        <View style={styles.tabsRow}>
                            <Pressable
                                onPress={() => setActiveTab('Episodes')}
                                style={[styles.tabItem, activeTab === 'Episodes' && styles.activeTabItem]}
                            >
                                <Text style={[styles.tabText, activeTab === 'Episodes' && styles.activeTabText]}>Episodes</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setActiveTab('MoreLikeThis')}
                                style={[styles.tabItem, activeTab === 'MoreLikeThis' && styles.activeTabItem]}
                            >
                                <Text style={[styles.tabText, activeTab === 'MoreLikeThis' && styles.activeTabText]}>More Like This</Text>
                            </Pressable>
                        </View>
                    </View>
                )}

                {/* Episodes List */}
                {isTV && activeTab === 'Episodes' && (
                    <View style={styles.episodesList}>
                        {episodes.map(ep => (
                            <EpisodeCard
                                key={ep.id}
                                title={ep.title}
                                duration={ep.duration}
                                plot={ep.plot}
                                poster={ep.poster || getImageUrl(movie.poster_path)}
                            />
                        ))}
                    </View>
                )}

                {/* Footer Spacing */}
                <View style={{ height: 40 }} />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 90, // Covers status bar area
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.5)', // transparent sticky header
        zIndex: 100,
    },
    headerBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoContainer: {
        width: width,
        height: 250,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPreview: {
        width: '100%',
        height: '100%',
    },
    playOverlay: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    muteBtn: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 35,
        height: 35,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        padding: 12,
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    match: {
        color: '#46d369',
        fontWeight: 'bold',
        fontSize: 14,
    },
    year: {
        color: '#ccc',
        fontSize: 14,
    },
    ageBadge: {
        backgroundColor: '#333',
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
    },
    ageText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    duration: {
        color: '#ccc',
        fontSize: 14,
    },
    pkgPlayBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        marginBottom: 10,
    },
    pkgPlayText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    pkgDownloadBtn: {
        backgroundColor: '#333',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        marginBottom: 16,
    },
    pkgDownloadText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    description: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    subText: {
        color: '#b3b3b3', // a lighter grey
        fontSize: 12,
        marginBottom: 4,
        lineHeight: 16,
    },
    actionBar: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'flex-start',
        gap: 40,
        paddingHorizontal: 16,
    },
    actionBtn: {
        alignItems: 'center',
    },
    actionLabel: {
        color: '#ccc',
        fontSize: 12,
        marginTop: 6,
    },
    tabContainer: {
        marginBottom: 10,
    },
    tabBorderTop: {
        height: 1,
        backgroundColor: '#333',
        marginHorizontal: 12,
        marginBottom: 12,
    },
    tabsRow: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        gap: 20,
    },
    tabItem: {
        paddingTop: 10,
        paddingBottom: 5,
        borderTopWidth: 4,
        borderTopColor: 'transparent', // Default hidden
    },
    activeTabItem: {
        borderTopColor: '#E50914',
    },
    tabText: {
        color: '#aaa',
        fontSize: 15,
        fontWeight: 'bold',
    },
    activeTabText: {
        color: '#fff',
    },
    episodesList: {
        paddingHorizontal: 8,
    },
});
