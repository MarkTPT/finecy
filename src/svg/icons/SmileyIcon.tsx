import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function SmileyIcon({
  size = IconSize.LG,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="transparent">
      <Path
        d="M20.5 15C21.3284 15 22 14.3284 22 13.5C22 12.6716 21.3284 12 20.5 12C19.6716 12 19 12.6716 19 13.5C19 14.3284 19.6716 15 20.5 15Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M21 19C19.9625 20.7938 18.2213 22 16 22C13.7787 22 12.0375 20.7938 11 19"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5 15C12.3284 15 13 14.3284 13 13.5C13 12.6716 12.3284 12 11.5 12C10.6716 12 10 12.6716 10 13.5C10 14.3284 10.6716 15 11.5 15Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
