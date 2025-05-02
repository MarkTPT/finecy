import BarcodeIcon from '@/svg/icons/BarcodeIcon';
import CalendarIcon from '@/svg/icons/CalendarIcon';
import DashboardIcon from '@/svg/icons/DashboardIcon';
import OverviewIcon from '@/svg/icons/OverviewIcon';
import UserIcon from '@/svg/icons/UserIcon';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarInactiveTintColor: '#EAECF0',
        tabBarActiveTintColor: '#5AA4FE',

        tabBarIconStyle: { height: '100%' },
        tabBarBadgeStyle: { top: '15%', end: '-25%' },
        tabBarStyle: {
          height: insets.bottom + 80,
          backgroundColor: '#343B42',
          borderTopWidth: undefined,
        },

        animation: 'fade',
        transitionSpec: { animation: 'timing', config: { duration: 100 } },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <DashboardIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="overview"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color }) => <OverviewIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="scanInvoice"
        options={{
          title: 'Scan Invoice',
          tabBarIcon: ({ color }) => <BarcodeIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
