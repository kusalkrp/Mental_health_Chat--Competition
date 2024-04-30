
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Context.jsx'
import { AuthProvider } from '@asgardeo/auth-react';

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider
    config={{
		signInRedirectURL: window.configs.auth.signInRedirectURL,
		signOutRedirectURL: window.configs.auth.signOutRedirectURL,
		clientID: window.configs.auth.clientID,
		baseUrl:  window.configs.auth.baseUrl,
		scope: [ "openid","profile" ]
    }}
  >
    <ContextProvider>
      <App />
    </ContextProvider>
  </AuthProvider>
);
