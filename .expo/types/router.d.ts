/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/message` | `/(tabs)/profile` | `/(tabs)\_layout` | `/(tabs)\connect` | `/(tabs)\profile` | `/..\components\ToggleOnline` | `/_sitemap` | `/login` | `/message` | `/pairing` | `/profile` | `/register`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
