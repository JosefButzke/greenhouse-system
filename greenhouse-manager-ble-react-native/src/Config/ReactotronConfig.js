/* eslint-disable no-console */
import Reactotron from 'reactotron-react-native';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure({host: '192.168.0.6'})
    .useReactNative()
    .connect();

  tron.clear();
  console.tron = tron;
}
