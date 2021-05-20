import React from 'react';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap"

import './SignUp.css'
import axios from 'axios'

import Header from "../header/Header"

interface SignUpProps{
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  password2: string,

  usernameExists: boolean,
  emailExists: boolean,
  invalidPasswordLength: boolean,
  passwordMismatch: boolean
}

interface SignUpState{
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  password2: string,

  usernameExists: boolean,
  emailExists: boolean,
  invalidPasswordLength: boolean,
  passwordMismatch: boolean
}

class SignUp extends React.Component<SignUpProps, SignUpState>{

  constructor(props: SignUpProps){
    super(props)
    this.state = {
      username:"",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",

      usernameExists: false,
      emailExists: false,
      invalidPasswordLength: false,
      passwordMismatch: false
    }

    // bind method to class (for setState())
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e: React.FormEvent<any>) => {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value } as unknown as Pick<SignUpState, keyof SignUpState>)
  }

  handleSubmit(e: any){
    e.preventDefault()
    let formData = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    // Post formData to API
    axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin': '*'
                },
      url: 'http://localhost:5000/api/auth/register',
      data: formData
    })
    .then(res => {

        if (res.status === 200){

          // window.location.protocol+"//"+window.location.host

          // SET STATE FOR CONDITIONAL RENDERING                      
            // reset state
            this.setState({
              username:"",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              password2: "",
        
              usernameExists: false,
              emailExists: false,
              invalidPasswordLength: false,
              passwordMismatch: false
            })
            
            //Simulate an HTTP redirect:
            // window.location.replace(window.location.protocol+"//"+window.location.host+"/login")
        } 
      
      })
    .catch(err => {

      // SET STATE FOR CONDITIONAL RENDERING 
      if(err.response.data.message === "Username Exists"){

        this.setState({
          username:"",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          password2: "",
    
          usernameExists: true,
          emailExists: false,
          invalidPasswordLength: false,
          passwordMismatch: false
        })

        // window.location.replace(window.location.protocol+"//"+window.location.host)
      }

      else if(err.response.data.message === "Email Exists"){

        this.setState({
          username:"",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          password2: "",
    
          usernameExists: false,
          emailExists: true,
          invalidPasswordLength: false,
          passwordMismatch: false
        })

        // window.location.replace(window.location.protocol+"//"+window.location.host)
      }

      else if(err.response.data.message === "Invalid Password Length"){

        this.setState({
          username:"",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          password2: "",
    
          usernameExists: false,
          emailExists: true,
          invalidPasswordLength: true,
          passwordMismatch: false
        })

        // window.location.replace(window.location.protocol+"//"+window.location.host)
      }

      else if(err.response.data.message === "Password Mismatch"){

        this.setState({
          username:"",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          password2: "",
    
          usernameExists: false,
          emailExists: true,
          invalidPasswordLength: false,
          passwordMismatch: true
        })

        //Simulate an HTTP redirect:
        // window.location.replace(window.location.protocol+"//"+window.location.host)
      }


    })

    
  }


  // Life Cycle methods
  componentDidMount(){
    document.title = "Sign Up"
  }

  render(){

    // Get contact data from an array
    
    return (

        <div className="content">

          <Header 
                  home="Home"
                  about="About"
                  signup="Sign Up"
                  login="Log In"
                  />

          <Row>
          <Col >
            <Card className="signup-card">
              <CardHeader>
                <h5 className="signup-card-title">Sign Up</h5>
              </CardHeader>
              <CardBody>
                <Form action="" onSubmit={this.handleSubmit}>

                {this.state.usernameExists ?  <Col> <Button className="errorBtn" color="primary">Username Already Exists!</Button><br /><br /></Col>:""}
                {this.state.emailExists ?  <Col> <Button className="errorBtn" color="primary">Email Already Exists!</Button><br /><br /></Col>:""}
                {this.state.invalidPasswordLength ?  <Col> <Button className="errorBtn" color="primary">Invalid Password Length!</Button><br /><br /></Col>:""}
                {this.state.passwordMismatch ? <Col>  <Button className="errorBtn" color="primary">Password Mismatch!</Button><br /><br /></Col>:""}


                    <Col className="px-md-1 username" md="5">
                      <FormGroup>
                        <Input
                          placeholder="Username"
                          type="text"
                          name="username"
                          value={this.state.username} 
                          onChange={this.handleChange}
                          required
                        /><br/>
                      </FormGroup>
                    </Col>     

                    <Col className="px-md-1 fname" md="5">
                      <FormGroup>
                        <Input
                          placeholder="First Name"
                          type="text"
                          name="firstName"
                          value={this.state.firstName} 
                          onChange={this.handleChange}
                          required
                        /><br/>
                      </FormGroup>
                    </Col> 

                    <Col className="px-md-1 lname" md="5">
                      <FormGroup>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          name="lastName"
                          value={this.state.lastName} 
                          onChange={this.handleChange}
                          required
                        /><br/>
                      </FormGroup>
                    </Col> 

                    <Col className="px-md-1 email" md="5">
                      <FormGroup>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          value={this.state.email} 
                          onChange={this.handleChange}
                          required
                        /><br/>
                      </FormGroup>
                    </Col>   

                    <Col className="px-md-1 password" md="5">
                      <FormGroup>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          value={this.state.password} 
                          onChange={this.handleChange}
                          required
                        /><br/>
                      </FormGroup>
                    </Col>  

                    <Col className="px-md-1 password2" md="5">
                      <FormGroup>
                      <Input
                          placeholder="Retype Password"
                          type="password"
                          name="password2"
                          value={this.state.password2} 
                          onChange={this.handleChange}
                          required
                        />
                        
                      </FormGroup>
                    </Col>       

                    {/* password length check based on state */}
                    {this.state.password && this.state.password.length < 6 ? <p style={{color:"red", textAlign:"center"}}>Invalid Password Length</p> : ""}

                    {/* password mismatch based on state */}
                    {this.state.password && (this.state.password !== this.state.password2) ? <p style={{color:"red", textAlign:"center"}}>Passwords do not match</p> : ""}


                <Button className="btn-fill signup-btn" color="primary" type="submit">
                  Sign Up
                </Button>
                  
                </Form>
              </CardBody>
             
            </Card>
          </Col>
          
        </Row>
        </div>
      
    )
  }
    
  }

export default SignUp;
