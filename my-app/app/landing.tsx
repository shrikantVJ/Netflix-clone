import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
    const handleGetStarted = () => {
        router.replace('/login');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Movie Posters Image */}
            <View style={styles.postersContainer}>
                <Image
                    source={require('@/assets/video/Rectangle 64.png')}
                    style={styles.postersImage}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)', '#000']}
                    style={styles.imageGradient}
                />
            </View>

            {/* Content Overlay */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)', '#000']}
                style={styles.gradientOverlay}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.headline}>Unlimited entertainment,{'\n'}one low price.</Text>
                    <Text style={styles.subtitle}>All of Netflix, starting at just{'\n'}₹149.</Text>

                    {/* Pagination Dots */}
                    <View style={styles.dotsContainer}>
                        <View style={[styles.dot, styles.dotActive]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>

                    {/* Get Started Button */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.getStartedButton,
                            pressed && styles.getStartedButtonPressed
                        ]}
                        onPress={handleGetStarted}
                    >
                        <Text style={styles.getStartedText}>GET STARTED</Text>
                    </Pressable>
                </View>
            </LinearGradient>

            {/* Bottom Navigation Placeholder */}
            <View style={styles.bottomNav}>
                <View style={styles.navItem}>
                    <View style={styles.navIcon} />
                </View>
                <View style={styles.navItem}>
                    <View style={styles.navIcon} />
                </View>
                <View style={styles.navItem}>
                    <View style={styles.navIcon} />
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
    postersContainer: {
        flex: 1,
        position: 'relative',
    },
    postersImage: {
        width: '100%',
        height: '100%',
    },
    imageGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '70%',
    },
    gradientOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height * 0.6,
        justifyContent: 'flex-end',
        paddingBottom: 80,
    },
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headline: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 24,
        opacity: 0.9,
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#666',
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: '#fff',
    },
    getStartedButton: {
        backgroundColor: '#E50914',
        paddingVertical: 16,
        paddingHorizontal: 80,
        borderRadius: 4,
        width: width - 40,
        alignItems: 'center',
        shadowColor: '#E50914',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    getStartedButtonPressed: {
        backgroundColor: '#B8070D',
        transform: [{ scale: 0.98 }],
    },
    getStartedText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#141414',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIcon: {
        width: 24,
        height: 24,
        backgroundColor: '#666',
        borderRadius: 4,
    },
});
