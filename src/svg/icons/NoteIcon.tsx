import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function NoteIcon({
  size = IconSize.XL,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 33 33" fill="transparent">
      <Path
        d="M19.7645 27.583H6.17822C5.91301 27.583 5.65865 27.4777 5.47112 27.2901C5.28358 27.1026 5.17822 26.8482 5.17822 26.583V6.58301C5.17822 6.31779 5.28358 6.06344 5.47112 5.8759C5.65865 5.68836 5.91301 5.58301 6.17822 5.58301H26.1782C26.4434 5.58301 26.6978 5.68836 26.8853 5.8759C27.0729 6.06344 27.1782 6.31779 27.1782 6.58301V20.1693C27.1781 20.4341 27.0729 20.6881 26.8857 20.8755L20.4707 27.2905C20.2833 27.4777 20.0293 27.5829 19.7645 27.583Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.0882 20.5818H20.1782V27.4918"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
