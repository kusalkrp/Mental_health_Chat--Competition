
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Context.jsx'
import { AuthProvider } from '@asgardeo/auth-react';

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider
    config={{
      signInRedirectURL: "https://3bfb4f24-d2c2-4edf-84fb-2b6a0bdce305.e1-us-cdp-2.choreoapps.dev",
      signOutRedirectURL: "https://3bfb4f24-d2c2-4edf-84fb-2b6a0bdce305.e1-us-cdp-2.choreoapps.dev",
      clientID: "M4qEzHtcHPrd8fr8qvgP4tuYKR0a",
      baseUrl: "https://api.asgardeo.io/t/diyasen",
		  scope: [ "openid","profile" ]
    }}
  >
    <ContextProvider>
      <App />
    </ContextProvider>
  </AuthProvider>
);
