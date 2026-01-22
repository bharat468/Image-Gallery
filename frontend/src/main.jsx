import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="56249602568-odvk0c8kk3r57afp2fqqtldng4h59tb4.apps.googleusercontent.com">
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  </GoogleOAuthProvider>

)
