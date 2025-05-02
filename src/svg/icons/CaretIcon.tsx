import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function CaretIcon({
  size = IconSize.LG,
  rotate = 0,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 33 33"
      fill="transparent"
      style={{ transform: [{ rotate: `${rotate}deg` }] }}
    >
      <Path
        d="M20.6223 26.8531L10.6223 16.8531L20.6223 6.85315"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
