import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function CartIcon({
  size = IconSize.LG,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="transparent">
      <Path
        d="M23.5 23H11.3962C10.9279 22.9999 10.4744 22.8355 10.1148 22.5353C9.75527 22.2352 9.51247 21.8183 9.42875 21.3575L6.09125 3H3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M11.5 28C12.8807 28 14 26.8807 14 25.5C14 24.1193 12.8807 23 11.5 23C10.1193 23 9 24.1193 9 25.5C9 26.8807 10.1193 28 11.5 28Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.5 28C24.8807 28 26 26.8807 26 25.5C26 24.1193 24.8807 23 23.5 23C22.1193 23 21 24.1193 21 25.5C21 26.8807 22.1193 28 23.5 28Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.81875 18H24.5125C24.9809 17.9999 25.4344 17.8355 25.7939 17.5353C26.1535 17.2352 26.3963 16.8183 26.48 16.3575L28 8H7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
