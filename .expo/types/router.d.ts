/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/connect` | `/(tabs)/message` | `/(tabs)/profile` | `/(tabs)\connect` | `/(tabs)\message` | `/(tabs)\profile` | `/..\components\ToggleOnline` | `/_sitemap` | `/connect` | `/login` | `/message` | `/pairing` | `/profile` | `/register`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
