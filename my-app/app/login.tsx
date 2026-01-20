import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Navigate to profiles screen
        router.push('/profiles');
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </Pressable>
                <Image
                    source={require('@/assets/video/Netflix_Logomark.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.formContainer}>
                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email or phone number"
                            placeholderTextColor="#B0B0B0"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#B0B0B0"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    {/* Sign In Button */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.signInButton,
                            pressed && styles.signInButtonPressed
                        ]}
                        onPress={handleSignIn}
                    >
                        <Text style={styles.signInText}>Sign In</Text>
                    </Pressable>

                    <View style={styles.helpContainer}>
                        <Text style={styles.helpText}>Need help?</Text>
                    </View>

                    {/* Guest Login Option */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.guestButton,
                            pressed && styles.guestButtonPressed
                        ]}
                        onPress={handleSignIn}
                    >
                        <Text style={styles.guestButtonText}>Continue as Guest</Text>
                    </Pressable>

                    <View style={styles.signupContainer}>
                        <Text style={styles.newToNetflixText}>New to Netflix? </Text>
                        <Text style={styles.signupText}>Sign up now.</Text>
                    </View>

                    <View style={styles.recaptchaContainer}>
                        <Text style={styles.recaptchaText}>
                            Sign in is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
                            <Text style={styles.learnMoreText}>Learn more.</Text>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    logo: {
        width: 100,
        height: 30,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    formContainer: {
        width: '100%',
        paddingBottom: 50,
    },
    inputContainer: {
        backgroundColor: '#333333',
        borderRadius: 4,
        marginBottom: 16,
        height: 60,
        justifyContent: 'center',
    },
    input: {
        color: '#fff',
        fontSize: 16,
        paddingHorizontal: 16,
        height: '100%',
    },
    signInButton: {
        borderWidth: 1,
        borderColor: '#fff', // Or #E50914 depending on specific design, image shows border
        backgroundColor: 'transparent', // Or black
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    signInButtonPressed: {
        backgroundColor: '#333',
    },
    signInText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    helpContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    helpText: {
        color: '#B0B0B0',
        fontSize: 16,
        fontWeight: '600',
    },
    guestButton: {
        marginTop: 30,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    guestButtonPressed: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    guestButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    newToNetflixText: {
        color: '#737373', // Grayish
        fontSize: 16,
        fontWeight: '600',
    },
    signupText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    recaptchaContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    recaptchaText: {
        color: '#8c8c8c',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
    },
    learnMoreText: {
        color: '#b3b3b3',
    },
});
