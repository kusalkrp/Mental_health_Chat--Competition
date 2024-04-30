
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Context.jsx'
import { AuthProvider } from '@asgardeo/auth-react';

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider
    config={{
		signInRedirectURL: "http://localhost:5173",
		signOutRedirectURL: "http://localhost:5173",
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
