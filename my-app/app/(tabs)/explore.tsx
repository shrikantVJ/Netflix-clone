import { fetchTrending, getImageUrl, searchMovies } from '@/app/services/tmdb';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Initial load: show trending as "Top Searches"
  useEffect(() => {
    const loadInitial = async () => {
      const trending = await fetchTrending();
      setResults(trending || []);
    };
    loadInitial();
  }, []);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      setLoading(true);
      const data = await searchMovies(text);
      setResults(data || []);
      setLoading(false);
    } else if (text.length === 0) {
      // Revert to trending logic if empty
      const trending = await fetchTrending();
      setResults(trending || []);
    }
  };

  const handlePress = (item: any) => {
    const type = item.media_type || 'movie';
    router.push(`/movie/${item.id}?type=${type}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#B0B0B0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a show, movie, genre, etc."
          placeholderTextColor="#B0B0B0"
          value={query}
          onChangeText={handleSearch}
          autoCorrect={false}
        />
        {query.length > 0 && (
          <Pressable onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={20} color="#B0B0B0" />
          </Pressable>
        )}
      </View>

      <Text style={styles.sectionTitle}>
        {query.length > 0 ? 'Results' : 'Top Searches'}
      </Text>

      {loading ? (
        <ActivityIndicator size="small" color="#E50914" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => handlePress(item)}>
              <View style={styles.resultItem}>
                <Image
                  source={{ uri: getImageUrl(item.backdrop_path || item.poster_path) }}
                  style={styles.resultImage}
                  resizeMode="cover"
                />
                <Text style={styles.resultTitle} numberOfLines={2}>
                  {item.title || item.name}
                </Text>
                <Ionicons name="play-circle-outline" size={28} color="#fff" style={styles.playIcon} />
              </View>
            </Pressable>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 10,
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 4,
    marginTop: 50, // Safe area
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginVertical: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 4,
    paddingVertical: 4,
    backgroundColor: '#121212',
  },
  resultImage: {
    width: 140,
    height: 76, // 16:9 ish ratio
    borderRadius: 4,
    backgroundColor: '#333',
  },
  resultTitle: {
    flex: 1,
    color: '#fff',
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  playIcon: {
    marginLeft: 10,
  },
});
