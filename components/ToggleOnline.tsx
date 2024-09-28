import React, { useMemo, useEffect } from 'react';
import {
    connect,
    publish,
    subscribe,
    checkBluetoothPermission,
    checkBluetoothAvailability,
    useNearbyErrorCallback,
    addOnErrorListener,
    disconnect,
    unsubscribe,
    unpublish,
} from 'react-native-google-nearby-messages';
import Constants from 'expo-constants';

const EnableConnections = async (firebaseUsername:any) => {

    const hasPermission = await checkBluetoothPermission();
    if (!hasPermission) {
        console.error('Bluetooth permission not granted');
        return;
    }

    const isBluetoothAvailable = await checkBluetoothAvailability();
    if (!isBluetoothAvailable) {
        console.error('Bluetooth not available');
        return;
    }

    const disconnect = await connect({ apiKey: Constants?.expoConfig?.extra?.nearbyApikey });
    const unpublish = await publish('hello !');

    const unsubscribe = await subscribe(
        (m) => {
            console.log(`New message found: ${m}`);
        },
        (m) => {
            console.log(`Message lost: ${m}`);
        }
    );

    return { disconnect, unsubscribe, unpublish};
};

const DisableConnections = async (disconnect:any, unsubscribe:any, unpublish:any, removeListener:any) => {
    if (unpublish) await unpublish();
    if (unsubscribe) await unsubscribe();
    if (disconnect) await disconnect();
    if (removeListener) removeListener(); // Call the listener removal
};

export { EnableConnections, DisableConnections };
