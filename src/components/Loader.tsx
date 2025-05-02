import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import BodyText from '@/components/BodyText';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Screen';

const SPINNER_SIZE = 90 as const;

type LoaderProps = {
  text?: string;
};

export default function Loader({ text }: LoaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',

        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      }}
    >
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: '#1B2128',
        }}
      />

      <View
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Progress.CircleSnail
          color="#5AA4FE"
          size={SPINNER_SIZE}
          thickness={SPINNER_SIZE / 10}
          duration={1500}
          spinDuration={2000}
          direction="clockwise"
        />

        {text && (
          <BodyText
            style={{
              marginTop: 30,
              fontSize: 18,
              color: 'white',
            }}
          >
            {text}
          </BodyText>
        )}
      </View>
    </View>
  );
}
