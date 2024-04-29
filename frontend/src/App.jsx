import './app.css'
import { Fragment } from "react";
import Main from "./components/main/Main"
import Sidebar from "./components/sidebar/Sidebar"
import { Home } from "./pages/Home"
import { useAuthContext } from "@asgardeo/auth-react";

const App = () => {

  const { state, signIn, signOut } = useAuthContext();  

  return (
    <div className="App">
      {
      state.isAuthenticated
        ? (
          <Fragment>
            <Sidebar
              isAuthenticated = {state.isAuthenticated}
            />
            <Main
              isAuthenticated = {state.isAuthenticated}
              username = {state.username}
              logoutButton = {
                <button onClick={() => signOut()}>Logout</button>
              }
              
            />
          </Fragment>
        )
        : (
          <Home
            isAuthenticated = {state.isAuthenticated}
            loginButton = {
              <button className="btn" onClick={() => signIn()}>Sign In</button>
            }
          />
        )
      } 
    </div>
  )
}

export default App