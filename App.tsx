import React from 'react';
import Routes from './src/routes/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/shared/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
