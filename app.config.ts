import type { ConfigContext, ExpoConfig } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? 'Finecy (Dev)' : 'Finecy',
  slug: 'finecy',
  scheme: 'finecy',
  owner: 'finecy',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/images/expo/icon.png',
  userInterfaceStyle: 'dark',
  newArchEnabled: true,
  assetBundlePatterns: ['**/*'],
  platforms: ['ios', 'android'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV ? 'com.finecy.dev' : 'com.finecy.finecy',
    runtimeVersion: '1.0.0',
  },
  android: {
    package: IS_DEV ? 'com.finecy.dev' : 'com.finecy.finecy',
    runtimeVersion: {
      policy: 'appVersion',
    },
  },
  experiments: {
    typedRoutes: true,
    turboModules: true,
    tsconfigPaths: true,
  },
  extra: {
    eas: {
      projectId: 'e4ed0a17-42b4-4a82-96cc-b35f12f7df3b',
    },
  },
  updates: {
    url: 'https://u.expo.dev/e4ed0a17-42b4-4a82-96cc-b35f12f7df3b',
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#fff',
        image: './assets/images/expo/icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        android: {
          adaptiveIcon: {
            foregroundImage: './assets/images/expo/adaptive-icon.png',
            backgroundColor: '#fff',
          },
        },
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          'node_modules/@expo-google-fonts/inter/Inter_400Regular.ttf',
          'node_modules/@expo-google-fonts/inter/Inter_700Bold.ttf',
        ],
      },
    ],
    [
      'expo-dev-client',
      {
        addGeneratedScheme: !!IS_DEV,
      },
    ],
    'expo-router',
    [
      'expo-camera',
      {
        cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
        recordAudioAndroid: false,
      },
    ],
    ['expo-dev-launcher', { launchMode: 'most-recent' }],

    // [
    //   'expo-build-properties',
    //   {
    //     android: {
    //       compileSdkVersion: 35,
    //       targetSdkVersion: 35,
    //       buildToolsVersion: '35.0.0',
    //       minSdkVersion: 24,
    //       // ndkVersion: '26.1.10909125',
    //     },
    //     ios: {
    //       deploymentTarget: '15.1',
    //     },
    //   },
    // ],
  ],
});
