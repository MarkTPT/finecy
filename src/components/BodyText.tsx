import Fonts from '@/constants/Fonts';
import { Text, type TextProps } from 'react-native';

export default function BodyText(props: TextProps) {
  const { style, ...otherProps } = props;

  return (
    <Text
      style={[
        {
          fontSize: 14,
          fontFamily: Fonts.Inter400,
          color: '#1B2128',
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
