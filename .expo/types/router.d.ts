/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/connect` | `/(tabs)/message` | `/(tabs)/profile` | `/(tabs)\_layout` | `/(tabs)\connect` | `/(tabs)\message` | `/(tabs)\profile` | `/..\components\GatherNearbyUsers` | `/..\components\ToggleOnline` | `/_sitemap` | `/connect` | `/login` | `/message` | `/profile` | `/register`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
