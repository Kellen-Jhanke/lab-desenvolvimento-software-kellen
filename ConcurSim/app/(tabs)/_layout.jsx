import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs screenOptions={{
        headerShown: false
      }}>
        <Tabs.Screen name="home"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
            tabBarLabel: 'Home'
          }} />
        <Tabs.Screen name="explore"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} />,
            tabBarLabel: 'Explorar'
          }} />
        <Tabs.Screen name="progresso"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="analytics-outline" size={size} color={color} />,
            tabBarLabel: 'Progresso'
          }} />
      </Tabs>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})