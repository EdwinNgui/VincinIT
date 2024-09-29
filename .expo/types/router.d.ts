/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
<<<<<<< HEAD
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/connect` | `/(tabs)/message` | `/(tabs)/profile` | `/_sitemap` | `/connect` | `/login` | `/message` | `/profile` | `/register`;
=======
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/connect` | `/(tabs)/profile` | `/(tabs)\_layout` | `/(tabs)\connect` | `/(tabs)\message` | `/(tabs)\profile` | `/_sitemap` | `/connect` | `/login` | `/profile` | `/register`;
>>>>>>> 8e30b5cbd7eb49633353629818ceadff480dc108
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
