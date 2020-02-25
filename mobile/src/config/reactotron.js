import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronReduxSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ host: '192.168.56.1' })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronReduxSaga())
    .connect();

  console.tron = tron;
  console.tron.clear();
}
