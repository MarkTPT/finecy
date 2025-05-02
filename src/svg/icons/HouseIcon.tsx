import Svg, { Path } from 'react-native-svg';
import IconSize from '../enums/IconSize';
import type IconProps from '../types/IconProps';

export default function HouseIcon({
  size = IconSize.LG,
  color = '#EAECF0',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="transparent">
      <Path
        d="M13 27V19H19V27H27V15C27.0001 14.8686 26.9743 14.7385 26.9241 14.6171C26.8739 14.4957 26.8003 14.3854 26.7075 14.2925L16.7075 4.29249C16.6146 4.19952 16.5043 4.12576 16.3829 4.07543C16.2615 4.02511 16.1314 3.99921 16 3.99921C15.8686 3.99921 15.7385 4.02511 15.6171 4.07543C15.4957 4.12576 15.3854 4.19952 15.2925 4.29249L5.2925 14.2925C5.19967 14.3854 5.12605 14.4957 5.07586 14.6171C5.02568 14.7385 4.9999 14.8686 5 15V27H13Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
