import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import {StoreProvider} from './stores/context';
import {NativeBaseProvider} from 'native-base';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import WalletConnectProvider, {
  useWalletConnect,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withIAPContext} from 'react-native-iap';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App = () => {
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    SplashScreen.hide();
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return (
    <StoreProvider>
      <WalletConnectProvider
        redirectUrl={'https://walletconnect.com/registry'}
        storageOptions={{
          asyncStorage: AsyncStorage,
        }}>
        <NativeBaseProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={{flex: 1}}>
              <RootStack />
            </GestureHandlerRootView>
          </NavigationContainer>
        </NativeBaseProvider>
      </WalletConnectProvider>
      <Toast />
    </StoreProvider>
  );
};

export default withIAPContext(App);
