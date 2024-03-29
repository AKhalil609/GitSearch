import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import { store } from './app/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container); 
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
