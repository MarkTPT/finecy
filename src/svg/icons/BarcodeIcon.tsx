import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function BarcodeIcon({
  size = IconSize.XL,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 128 128" fill="transparent">
      <Path
        d="M40 108H20V88"
        stroke="#5AA4FE"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M108 88V108H88"
        stroke="#5AA4FE"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M88 20H108V40"
        stroke="#5AA4FE"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 40V20H40"
        stroke="#5AA4FE"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M84 88H44"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M84 72H44"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M84 56H44"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M84 40H44"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
