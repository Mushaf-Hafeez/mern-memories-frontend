import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#1F1F27',
            color: '#fff',
          },
        }} />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>

)
