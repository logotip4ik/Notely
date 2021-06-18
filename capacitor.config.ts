import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Notely',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    StatusBar: {
      overlaysWebView: { overlay: true },
      style: { style: 'LIGHT' },
      backgroundColor: { color: '#00000025' },
    },
    SplashScreen: {
      splashFullScreen: true,
    },
  },
};

export default config;
