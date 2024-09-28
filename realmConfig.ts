import {createRealmContext} from '@realm/react';
import * as Realm from 'realm'
// Define your MongoDB Realm app configuration
const appConfig = {
  id: "66f85cf08f32cc1e5ad2b6ea", // Your MongoDB Realm App ID
};
// Use the `Realm` instance
const realmApp = new Realm.App(appConfig);
export default realmApp;
