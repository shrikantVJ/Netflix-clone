import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

// Data matching the uploaded screenshot
const PROFILES = [
    { id: '1', name: 'Drashti', color: '#1B4D66' }, // Darker blue/teal
    { id: '2', name: 'Bhavesh', color: '#EFC92C' }, // Yellow
    { id: '3', name: 'Aditi', color: '#68C488' },   // Green
    { id: '4', name: 'Prit', color: '#E50914' },    // Red
    { id: '5', name: 'Kavya', color: '#2C81E3' },   // Blue
];

export default function ProfilesScreen() {
    const handleProfileSelect = (name: string) => {
        // Navigate access home/tabs
        router.replace('/(tabs)');
    };

    const handleEdit = () => {
        // Edit mode placeholder
        console.log('Edit profiles');
    };

    const renderProfile = ({ item }: { item: typeof PROFILES[0] }) => (
        <View style={styles.profileWrapper}>
            <Pressable
                style={({ pressed }) => [
                    styles.profileIcon,
                    { backgroundColor: item.color },
                    pressed && styles.profilePressed
                ]}
                onPress={() => handleProfileSelect(item.name)}
            >
                <View style={styles.faceContainer}>
                    {/* Simple smiley face simulation with views */}
                    <View style={styles.eyesRow}>
                        <View style={styles.eye} />
                        <View style={styles.eye} />
                    </View>
                    <View style={styles.mouth} />
                </View>
            </Pressable>
            <Text style={styles.profileName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require('@/assets/video/Netflix_Logomark.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Pressable onPress={handleEdit} style={styles.editButton}>
                    <MaterialIcons name="edit" size={24} color="#fff" />
                </Pressable>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Who's Watching?</Text>

                <View style={styles.gridContainer}>
                    {PROFILES.map(item => (
                        <View key={item.id} style={styles.gridItem}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.profileIcon,
                                    { backgroundColor: item.color },
                                    pressed && styles.profilePressed
                                ]}
                                onPress={() => handleProfileSelect(item.name)}
                            >
                                {/* Simplified face for the icon to match style */}
                                <View style={styles.faceContainer}>
                                    <View style={styles.eyesRow}>
                                        <View style={styles.eye} />
                                        <View style={styles.eye} />
                                    </View>
                                    <View style={styles.mouth} />
                                </View>
                            </Pressable>
                            <Text style={styles.profileName}>{item.name}</Text>
                        </View>
                    ))}

                    {/* Add Profile Button (Placeholder to fill grid if needed, or just leave empty) */}
                    <View style={styles.gridItem}>
                        {/* Empty for alignment if needed, or could be 'Add Profile' */}
                    </View>
                </View>
            </View>
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
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    logo: {
        width: 90,
        height: 30,
        // Start centered roughly
        marginLeft: (width - 40) / 2 - 45,
    },
    editButton: {
        padding: 8,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 40,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 30,
        maxWidth: 400,
    },
    gridItem: {
        alignItems: 'center',
        margin: 10,
        width: 100,
    },
    profileWrapper: {
        alignItems: 'center',
        margin: 12,
    },
    profileIcon: {
        width: 100,
        height: 100,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    profileName: {
        color: '#fff',
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
    },
    // Face Drawing Styles
    faceContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 40,
        marginBottom: 8,
    },
    eye: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    mouth: {
        width: 30,
        height: 14,
        borderBottomWidth: 3,
        borderBottomColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
});
