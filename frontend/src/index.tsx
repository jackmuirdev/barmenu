import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/index.css'
import { RouterProvider } from 'react-router-dom';
import router from './router/Routes';
import { StoreProvider } from './context/StoreContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
)
