const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;
const BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500';
const IMAGE_ORIGINAL_URL = process.env.EXPO_PUBLIC_TMDB_IMAGE_ORIGINAL_URL || 'https://image.tmdb.org/t/p/original';

interface ApiConfig {
    headers: {
        Authorization: string;
        'Content-Type': string;
    };
}

const config: ApiConfig = {
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
    },
};

export const getImageUrl = (path: string | null) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${IMAGE_BASE_URL}${path}`;
};

export const getOriginalImageUrl = (path: string | null) => {
    if (!path) return 'https://via.placeholder.com/1920x1080?text=No+Image';
    return `${IMAGE_ORIGINAL_URL}${path}`;
};

export const fetchTrending = async () => {
    try {
        const response = await fetch(`${BASE_URL}/trending/all/day?language=en-US`, config);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching trending:', error);
        return [];
    }
};

export const fetchTopRated = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=1`, config);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching top rated:', error);
        return [];
    }
};

export const searchMovies = async (query: string) => {
    try {
        if (!query) return [];
        const response = await fetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, config);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
};

export const fetchMovieDetails = async (id: string, type: string = 'movie') => {
    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}?language=en-US&append_to_response=credits,similar`, config);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching details:', error);
        return null;
    }
};
