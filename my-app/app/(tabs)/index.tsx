import { fetchTopRated, fetchTrending, getImageUrl, getOriginalImageUrl } from '@/app/services/tmdb';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

// Fallback data if API fails or is empty initially (optional, but good for stability)
// const FALLBACK_HERO = { title: "Hero Movie", poster_path: null, backdrop_path: null };

export default function HomeScreen() {
  const [trending, setTrending] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [heroMovie, setHeroMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const trendingData = await fetchTrending();
        const topRatedData = await fetchTopRated();

        setTrending(trendingData);
        setTopRated(topRatedData);

        if (trendingData && trendingData.length > 0) {
          setHeroMovie(trendingData[0]);
        }
      } catch (e) {
        console.error("Failed to load data", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleMoviePress = (item: any) => {
    // Pass ID and Type (movie/tv) if available, default to movie
    const type = item.media_type || 'movie';
    const uri = item.poster_path; // Just for fallback encoding if needed, but ID is main
    // We navigate to ID, and pass type as query param
    router.push(`/movie/${item.id}?type=${type}`);
  };

  const handleProfilePress = () => {
    router.push('/profiles');
  };

  const renderMovieItem = ({ item }: { item: any }) => (
    <Pressable onPress={() => handleMoviePress(item)}>
      <View style={styles.movieCard}>
        <Image
          source={{ uri: getImageUrl(item.poster_path) }}
          style={styles.movieImage}
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header (Absolute Overlay) */}
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Image
            source={require('@/assets/video/Netflix_Logomark.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerIcons}>
            <Pressable style={styles.iconButton}>
              <MaterialIcons name="cast" size={24} color="#fff" />
            </Pressable>
            <Pressable onPress={handleProfilePress}>
              <View style={styles.profileIcon} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Hero Section */}
        {heroMovie ? (
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: getOriginalImageUrl(heroMovie.poster_path) }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.4)', '#000']}
              style={styles.heroGradient}
            >
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>
                  {heroMovie.title || heroMovie.name}
                </Text>
                <Text style={styles.heroTags}>
                  {heroMovie.media_type === 'tv' ? 'TV Series' : 'Movie'} • Trending • Top 10
                </Text>
                <View style={styles.heroButtons}>
                  <Pressable
                    style={({ pressed }) => [styles.playButton, pressed && { opacity: 0.8 }]}
                    onPress={() => handleMoviePress(heroMovie)}
                  >
                    <Ionicons name="play" size={24} color="#000" />
                    <Text style={styles.playText}>Play</Text>
                  </Pressable>
                  <Pressable style={styles.listButton}>
                    <Ionicons name="add" size={24} color="#fff" />
                    <Text style={styles.listText}>My List</Text>
                  </Pressable>
                </View>
              </View>
            </LinearGradient>
          </View>
        ) : (
          // Placeholder if no hero (shouldn't happen with valid API)
          <View style={styles.heroContainer}>
            <Image
              source={require('@/assets/video/Rectangle 64.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Trending Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <FlatList
            data={trending}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Top Rated Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top Rated</Text>
          <FlatList
            data={topRated}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Extra spacing for bottom tabs */}
        <View style={{ height: 80 }} />

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
  scrollContent: {
    paddingBottom: 20,
  },
  heroContainer: {
    height: 500,
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28, // Bigger title
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    paddingHorizontal: 10,
  },
  heroTags: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  heroButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    minWidth: 100,
    justifyContent: 'center',
  },
  playText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  listButton: {
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    minWidth: 100,
    justifyContent: 'center',
  },
  listText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  movieCard: {
    width: 110,
    height: 160,
    marginRight: 10,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#333', // Placeholder color while loading image
  },
  movieImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 10,
    justifyContent: 'flex-start',
    paddingTop: 45, // Safe area
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 30, // Just the N
    height: 40,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconButton: {
    padding: 4,
  },
  profileIcon: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#1B4D66', // Matches Drashti
    borderWidth: 1,
    borderColor: '#fff',
  }
});
