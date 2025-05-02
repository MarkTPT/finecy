import { Text, type TextProps } from 'react-native';
import fonts from '@/constants/Fonts';

export default function HeadlineText(props: TextProps) {
  const { style, ...otherProps } = props;

  return (
    <Text
      style={[
        {
          fontSize: 24,
          fontFamily: fonts.Inter700,
          color: '#1B2128',
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
