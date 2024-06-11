import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="Home" 
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Faculty"
        options={{
          title: 'Faculty',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-o" color={color} />,
          headerTitle: 'Faculty Info',
        }}
      />
      <Tabs.Screen
        name="Academic"
        options={{
          title: 'Academic',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="university" color={color} />,
          headerTitle: 'Academic Calender',
        }}
      />
      <Tabs.Screen
        name="Emergency"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="times-rectangle" color={color} />,
          headerTitle: 'Emergency Contacts',
        }}
      />
    </Tabs>
  );
}
