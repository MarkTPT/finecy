import { Platform } from 'react-native';

export const Inter300 = Platform.select({
  android: 'Inter_300Light',
  ios: 'Inter-Light',
  default: 'Inter-Light',
});

export const Inter400 = Platform.select({
  android: 'Inter_400Regular',
  ios: 'Inter-Regular',
  default: 'Inter-Regular',
});

export const Inter700 = Platform.select({
  android: 'Inter_700Bold',
  ios: 'Inter-Bold',
  default: 'Inter-Bold',
});

export default {
  Inter300,
  Inter400,
  Inter700,
};
