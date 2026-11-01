import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
// Assuming you are using Expo Vector Icons, if not, replace with your icon library
import { Ionicons, Feather } from '@expo/vector-icons'; 
import AppShell from '@/components/AppShell';

export default function Notifications() {
  return (
    <AppShell>
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="bulb" size={24} color="#0f7b6c" />
          <Text style={styles.logoText}>ideahub</Text>
        </View>
        <View style={styles.profileContainer}>
          <Ionicons name="notifications-outline" size={24} color="#333" style={{ marginRight: 15 }} />
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>KM</Text>
          </View>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search notifications..." 
          placeholderTextColor="#888"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* PAGE TITLE */}
        <Text style={styles.subHeader}>THE GOOD THINGS HAPPENING</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Notifications</Text>
          <Pressable style={styles.markAllReadBtn}>
            <Ionicons name="checkmark-done" size={16} color="#333" />
            <Text style={styles.markAllReadText}>Mark all read</Text>
          </Pressable>
        </View>
        <Text style={styles.subtitle}>A little signal from the people and projects you care about.</Text>

        {/* UNREAD BANNER */}
        <View style={styles.unreadBanner}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="notifications" size={18} color="#0f7b6c" />
            <Text style={styles.unreadText}> <Text style={{fontWeight: 'bold'}}>3 unread updates</Text> are waiting for you.</Text>
          </View>
          <Text style={styles.unreadCount}>03</Text>
        </View>

        {/* FILTER TABS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          <Pressable style={[styles.tab, styles.activeTab]}><Text style={styles.activeTabText}>All</Text></Pressable>
          <Pressable style={styles.tab}><Text style={styles.tabText}>Mentions</Text></Pressable>
          <Pressable style={styles.tab}><Text style={styles.tabText}>Projects</Text></Pressable>
          <Pressable style={styles.tab}><Text style={styles.tabText}>Unread 3</Text></Pressable>
        </ScrollView>

        {/* NOTIFICATION LIST */}
        
        {/* Item 1 */}
        <View style={styles.notificationItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#fde8e8' }]}>
            <Ionicons name="heart" size={20} color="#d9534f" />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>
              <Text style={styles.boldText}>Maya Chen</Text> loved your project <Text style={{color: '#0f7b6c'}}>•</Text>
            </Text>
            <Text style={styles.notificationSubtext}>Orbit Notes · "The little details feel so thoughtful." <Text style={styles.linkText}>Open project</Text></Text>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>8 min ago</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color="#0f7b6c" />
            </View>
          </View>
        </View>

        {/* Item 2 */}
        <View style={styles.notificationItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#e8f0fe' }]}>
            <Ionicons name="chatbubble" size={20} color="#4a90e2" />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>
              <Text style={styles.boldText}>Inez</Text> left you a note <Text style={{color: '#0f7b6c'}}>•</Text>
            </Text>
            <Text style={styles.notificationSubtext}>Patchwork API · "Want to compare webhook flows?" <Text style={styles.linkText}>Open project</Text></Text>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>42 min ago</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color="#0f7b6c" />
            </View>
          </View>
        </View>

        {/* Item 3 */}
        <View style={styles.notificationItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#e8f5e9' }]}>
            <Ionicons name="person-add" size={20} color="#43a047" />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>
              <Text style={styles.boldText}>Jules Rivera</Text> started following you <Text style={{color: '#0f7b6c'}}>•</Text>
            </Text>
            <Text style={styles.notificationSubtext}>Building with AI · Brooklyn</Text>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>2 hours ago</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color="#0f7b6c" />
            </View>
          </View>
        </View>

        {/* Item 4 */}
        <View style={styles.notificationItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#fff3e0' }]}>
            <Ionicons name="trophy" size={20} color="#fb8c00" />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>
              <Text style={styles.boldText}>Small Hours</Text> reached 100 saves
            </Text>
            <Text style={styles.notificationSubtext}>A milestone for Theo Martin's project. <Text style={styles.linkText}>Open project</Text></Text>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>Yesterday</Text>
              <Ionicons name="ellipsis-horizontal" size={20} color="#888" />
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f7b6c',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 15,
    marginTop: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 40,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    letterSpacing: 1,
    marginBottom: 5,
    marginTop: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },
  markAllReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  markAllReadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 20,
  },
  unreadBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8f5e9', // Light green background
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  unreadText: {
    fontSize: 14,
    color: '#0f7b6c',
    marginLeft: 5,
  },
  unreadCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f7b6c',
  },
  tabsContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#e0f2f1',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    fontSize: 14,
    color: '#0f7b6c',
    fontWeight: 'bold',
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  notificationSubtext: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    lineHeight: 18,
  },
  linkText: {
    color: '#0f7b6c',
    fontWeight: '500',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
});