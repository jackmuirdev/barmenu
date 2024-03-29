import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/index.css'
import { RouterProvider } from 'react-router-dom';
import router from './router/Routes';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
