/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/app` | `/(tabs)/connect` | `/(tabs)/profile` | `/..\components\GatherNearbyUsers` | `/..\components\ToggleOnline` | `/_sitemap` | `/app` | `/connect` | `/login` | `/profile` | `/register`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
