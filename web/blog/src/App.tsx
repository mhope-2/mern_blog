import React from 'react';
import './App.css';
import SignUp from "./components/signup/SignUp"
import Login from "./components/login/Login"
import CreatePost from "./components/createPost/CreatePost"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Header from "./components/header/Header"

class App extends React.Component<{}>{

  // Life Cycle methods
  componentDidMount(){
    document.title = "Index"

  }

  render(){

    // Get contact data from an array
    
    return (
      <div className="Home">
        
        <Router>
          <Switch>

          <Route path="/post/create">
              <CreatePost />
            </Route>

            <Route path="/login">
              <Login 
                username=""
                password=""
                isLoggedIn={false}
                isInValidCredentials={false}
              />
            </Route>

            <Route path="/signup">
              <SignUp 
                    username=""
                    firstName=""
                    lastName=""
                    email=""
                    password=""
                    password2=""

                    usernameExists={false}
                    emailExists={false}
                    invalidPasswordLength={false}
                    passwordMismatch={false}
                    />
            </Route>

            <Route path="/">
            <Header 
                  home="Home"
                  about="About"
                  signup="Sign Up"
                  login="Log In"
                  />
              <p>Display all posts</p>
            </Route>


          </Switch>
        </Router> 

        </div>

      
      
    )
  }
    
  }



export default App;
