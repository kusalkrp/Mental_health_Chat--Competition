
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Context.jsx'
import { AuthProvider } from '@asgardeo/auth-react';

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider
    config={{
		signInRedirectURL: window.config.auth.signInRedirectURL,
		signOutRedirectURL: window.config.auth.signOutRedirectURL,
		clientID: window.config.auth.clientID,
		baseUrl:  window.config.auth.baseUrl,
		scope: [ "openid","profile" ]
    }}
  >
    <ContextProvider>
      <App />
    </ContextProvider>
  </AuthProvider>
);
