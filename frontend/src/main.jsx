
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Context.jsx'
import { AuthProvider } from '@asgardeo/auth-react';

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider
    config={{
      signInRedirectURL: "https://a51c1198-cefd-4876-9a80-4ed0ae8b4913.e1-us-cdp-2.choreoapps.dev",
      signOutRedirectURL: "https://a51c1198-cefd-4876-9a80-4ed0ae8b4913.e1-us-cdp-2.choreoapps.dev",
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
