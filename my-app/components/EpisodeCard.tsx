import { FontAwesome5, Octicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface EpisodeCardProps {
    title: string;
    poster: string;
    duration: string;
    plot: string;
    onPress?: () => void;
}

const EpisodeCard = ({ title, poster, duration, plot, onPress }: EpisodeCardProps) => {
    return (
        <View style={styles.episodeContainer}>
            <View style={styles.EpisodeDetails}>
                <View style={styles.left}>
                    <Image source={{ uri: poster }} style={styles.image} />
                    <Pressable style={styles.playBtn} onPress={onPress}>
                        <FontAwesome5 name="play" size={15} color="white" />
                    </Pressable>
                    <View style={styles.episodeDetails}>
                        <Text style={styles.episodeName} numberOfLines={1}>{title}</Text>
                        <Text style={styles.duration}>{duration}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <Octicons name="download" size={24} color="white" />
                </View>
            </View>
            <View style={styles.description}>
                <Text
                    style={styles.descriptionText}
                    ellipsizeMode="tail"
                    numberOfLines={3}>
                    {plot}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    episodeContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    EpisodeDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        position: 'relative',
    },
    image: {
        width: 120,
        height: 70,
        resizeMode: 'cover',
        borderRadius: 4,
        marginRight: 10,
    },
    episodeDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    episodeName: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    duration: {
        color: 'lightgrey',
        fontSize: 12,
    },
    right: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    playBtn: {
        position: 'absolute',
        borderColor: 'white',
        left: 40, // Centered on image (120/2 - 20)
        top: 15, // Centered on image (70/2 - 20)
        width: 40,
        height: 40,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        width: '100%',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    descriptionText: {
        color: '#aaa',
        fontSize: 13,
        lineHeight: 18,
    },
});

export default EpisodeCard;
