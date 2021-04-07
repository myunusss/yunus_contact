import React from 'react';
import { StyleSheet, DeviceEventEmitter, Alert, BackHandler } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';

import store from './src/Redux/Store';
import { SplashPage, Home, Contact } from './src/Main';

const App = () => {
  const [backPressSubscriptions, setBackPressSubscriptions] = useState(new Set());

  useEffect(() => {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      let invokeDefault = true;
      const subscriptions = [];

      backPressSubscriptions.forEach((sub) => subscriptions.push(sub));

      for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        if (subscriptions[i]()) {
          invokeDefault = false;
          break;
        }
      }

      if (invokeDefault) {
        BackHandler.exitApp();
      }
    });

    backPressSubscriptions.add(handleHardwareBack);
  }, [])

  useEffect(() => {
    return() => {
      DeviceEventEmitter.removeAllListeners('hardwareBackPress');
      backPressSubscriptions.clear();
    }
  }, [])

  function handleHardwareBack() {
    const {state} = Actions;
    if (_.get(state, 'index') > 0) {
      Actions.pop();
    } else {
      if (_.get(state, 'routes[0].index') > 0) {
        Actions.home();
      } else {
        Alert.alert('Mau keluar?', '',[
          {text: 'Batal', onPress: () => {}},
          {
            text: 'Keluar',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
      }
    }

    return true;
  };

  return (
    <Provider store={store}>
      <Router>
        <Stack key={'root'}>
          <Scene
            key="boot"
            component={SplashPage}
            hideNavBar={true}
            initial
          />
          <Scene
            key="home"
            component={Home}
            hideNavBar={true}
          />
          <Scene
            key="contact"
            component={Contact}
            hideNavBar={true}
          />
        </Stack>
      </Router>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
