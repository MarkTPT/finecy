import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function EurCurrencyIcon({
  size = IconSize.XL,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 33 33" fill="transparent">
      <Path
        d="M5.24463 14.4048H17.2446"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.24463 18.4048H15.2446"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M23.2446 25.1136C21.9496 26.2719 20.347 27.0306 18.6303 27.2981C16.9136 27.5656 15.1562 27.3305 13.5701 26.6211C11.9841 25.9118 10.6373 24.7585 9.69232 23.3006C8.74732 21.8426 8.24452 20.1423 8.24463 18.4048V14.4048C8.24452 12.6674 8.74732 10.9671 9.69232 9.50914C10.6373 8.05119 11.9841 6.89793 13.5701 6.18858C15.1562 5.47922 16.9136 5.24411 18.6303 5.51162C20.347 5.77912 21.9496 6.53781 23.2446 7.6961"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
