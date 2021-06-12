import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Notely',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    StatusBar: {
      OverlaysWebView: { overlay: true },
    },
    SplashScreen: {
      splashFullScreen: true,
    },
  },
};

export default config;
