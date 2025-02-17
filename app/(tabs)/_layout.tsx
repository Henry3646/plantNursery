import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { House, ShoppingCart, Timer, UserRound } from 'lucide-react-native'

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            paddingTop: 15,
            backgroundColor: '#FEFEE3'
          },
          default: {},
        }),
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ focused }) => <House size={40} strokeWidth={focused ? 2 : 1 } color='#2C6E49' />,
        }}
      />
      <Tabs.Screen
        name="Timer"
        options={{
          tabBarIcon: ({ focused }) => <Timer size={40} strokeWidth={focused ? 2 : 1 } color='#2C6E49'/>,
        }}
      />
      <Tabs.Screen
        name="(store)"
        options={{
          tabBarIcon: ({ focused }) => <ShoppingCart size={40} strokeWidth={focused ? 2 : 1 } color='#2C6E49'/>,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ focused }) => <UserRound size={40} strokeWidth={focused ? 2 : 1 } color='#2C6E49'/>,
        }}
      />
    </Tabs>
  );
}
