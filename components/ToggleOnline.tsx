import 
{
    connect,publish,subscribe,
    checkBluetoothPermission,
    checkBluetoothAvailability,
    useNearbyErrorCallback,
    addOnErrorListener,
    disconnect,
    unsubscribe,
    unpublish,
}from 'react-native-google-nearby-messages';
import Constants from 'expo-constants'

const EnableConnections = async () =>
{
    const removeListener = addOnErrorListener((kind, message) => console.error(`${kind}: ${message}`));
    const disconnect = await connect({apiKey: Constants?.expoConfig?.extra?.nearbyApikey});
    const unpublish = await publish('hello !');
    const unsubscribe = await subscribe(
    (m) => {
        console.log(`new message found: ${m}`);
    },
    (m) => {
        console.log(`message lost: ${m}`);
    });
};
const DisableConnections = async () =>
{
    disconnect();
    unsubscribe();
    unpublish();
}
export {EnableConnections,DisableConnections}