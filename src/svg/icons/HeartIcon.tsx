import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function HeartIcon({
  size = IconSize.LG,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="transparent">
      <Path
        d="M15.9998 28L27.1698 16.67C28.3421 15.4977 29.0007 13.9078 29.0007 12.25C29.0007 10.5921 28.3421 9.00223 27.1698 7.82997C25.9976 6.65771 24.4077 5.99915 22.7498 5.99915C21.092 5.99915 19.5021 6.65771 18.3298 7.82997L15.9998 9.99997L13.6698 7.82997C12.4976 6.65771 10.9077 5.99915 9.24985 5.99915C7.59203 5.99915 6.0021 6.65771 4.82985 7.82997C3.65759 9.00223 2.99902 10.5921 2.99902 12.25C2.99902 13.9078 3.65759 15.4977 4.82985 16.67L15.9998 28Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
