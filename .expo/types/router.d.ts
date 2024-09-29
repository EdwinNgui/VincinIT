/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/connect` | `/(tabs)/message` | `/(tabs)/profile` | `/_sitemap` | `/connect` | `/login` | `/message` | `/profile` | `/register`;
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/connect` | `/(tabs)\_layout` | `/(tabs)\connect` | `/(tabs)\message` | `/(tabs)\profile` | `/_sitemap` | `/connect` | `/login` | `/register`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
