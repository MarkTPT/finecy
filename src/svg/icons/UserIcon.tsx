import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function UserIcon({
  size = IconSize.LG,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="transparent">
      <Path
        d="M12.5 15C15.8137 15 18.5 12.3137 18.5 9C18.5 5.68629 15.8137 3 12.5 3C9.18629 3 6.5 5.68629 6.5 9C6.5 12.3137 9.18629 15 12.5 15Z"
        fill={color}
      />

      <Path
        d="M3.5 20.25C5.31594 17.1122 8.61406 15 12.5 15C16.3859 15 19.6841 17.1122 21.5 20.25"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
