import HeadlineText from '@/components/HeadlineText';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OverviewPage() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingTop: insets.top,

        flex: 1,
      }}
    >
      <View style={{ padding: 20 }}>
        <HeadlineText>Overview</HeadlineText>
      </View>
    </View>
  );
}
