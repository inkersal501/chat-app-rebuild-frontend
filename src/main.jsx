import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import store from "@store/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { google_clientId } from '@js/config.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer position="top-center" autoClose={2000} theme="dark"/>
    <GoogleOAuthProvider clientId={google_clientId}>
      <Provider store={store}>      
          <App />      
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
