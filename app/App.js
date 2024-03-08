import React from 'react';
import Navigators from './src/navigators';
import store from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Navigators />
    </Provider>
  );
}