import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';
import { usePathname, useRouter } from 'expo-router';
import { TAB_SCREENS } from '@/app/(tabs)/_layout';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function DownloadsScreen() {
    const pathname = usePathname();
    const router = useRouter();
    const { colorScheme } = useTheme();
    const currentTabIndex = TAB_SCREENS.findIndex(screen =>
        screen.name === '(profile)/profile'
    );
    const activeTabIndex = TAB_SCREENS.findIndex(screen =>
        pathname === `/${screen.name}` || (screen.name === 'index' && pathname === '/')
    );

    const slideDirection = activeTabIndex > currentTabIndex ? 'right' : 'left';
    const isActive = pathname === '/downloads';

    return (
        <TabScreenWrapper isActive={isActive} slideDirection={slideDirection} >
            <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? "white" : "black"} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Downloads</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[styles.iconContainer, {
                        backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f0f0f0',
                        borderWidth: 1,
                        borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                    }]}>
                        <Ionicons name="arrow-down" size={70} color={colorScheme === 'dark' ? "#6e6e6e" : "#999"} />
                    </View>

                    <Text style={[styles.heading, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Never be without Netflix</Text>

                    <Text style={[styles.description, { color: colorScheme === 'dark' ? '#999' : '#666' }]}>
                        Download shows and movies so you'll never be without something to watch — even when you're offline.
                    </Text>

                    <TouchableOpacity style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#fff' : '#000' }]}>
                        <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? '#000' : '#fff' }]}>See What You Can Download</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </TabScreenWrapper>
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
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 16,
    },
    backButton: {
        padding: 8,
        position: 'absolute',
        left: 0,
        zIndex: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',

    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 4,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
}); 