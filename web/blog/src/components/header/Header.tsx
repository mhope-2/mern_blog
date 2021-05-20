import React from 'react'
import "./Header.css"

  import {

    Navbar

  } from "reactstrap";


 interface HeaderProps {
    home: string,
    about: string,
    signup: string,
    login: string
 } 


 interface HeaderState {
    home: string,
    about: string,
    signup: string,
    login: string
 } 


class Header extends React.Component<HeaderProps, HeaderState>{

    constructor(props:HeaderProps){
        super(props)
        this.state={
            home: "Home",
            about: "About",
            signup: "Sign Up",
            login: "Log In"
        }
    }

  render(){

    // Get contact data from an array
    
    return (
        <div>
            <Navbar className="navbar-absolute navbar-fixed" expand="lg">
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">{this.state.home}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://google.com">{this.state.about}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signup">{this.state.signup}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">{this.state.login}</a>
                        </li>
                    </ul>
                </div>
            </Navbar><br/><br/><br/><br/>
        </div>
  
            
           /* { <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container">
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://google.com">About</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://google.com">Log In</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="http://localhost:3000/signup">Sign Up</a>
                </li>
                </ul>
            </div>
            </div>

        </nav> }*/


        
      
            )
        }       
  }

export default Header;
