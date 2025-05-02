import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function QuestionMarkIcon({
  size = IconSize.LG,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="transparent">
      <Path
        d="M16 20V18C19.8663 18 23 15.3138 23 12C23 8.68625 19.8663 6 16 6C12.1337 6 9 8.68625 9 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M16 28C17.1046 28 18 27.1046 18 26C18 24.8954 17.1046 24 16 24C14.8954 24 14 24.8954 14 26C14 27.1046 14.8954 28 16 28Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
