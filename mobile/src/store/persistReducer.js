import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

function persistReducers(reducers) {
  const options = {
    key: 'gobarber',
    storage: AsyncStorage,
    whitelist: ['auth', 'user'],
  };

  const persistedReducer = persistReducer(options, reducers);

  return persistedReducer;
}

export default persistReducers;
