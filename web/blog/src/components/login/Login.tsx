import React from 'react'
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

import './Login.css'
import axios from 'axios'
import Header from "../header/Header"

interface LogInProps{
    username: string,
    password: string,
    isLoggedIn: boolean,
    isInValidCredentials: boolean
  }
  
  interface LogInState{
    username: string,
    password: string,
    isLoggedIn: boolean,
    isInValidCredentials: boolean
  }


class Login extends React.Component<LogInProps, LogInState>{

    constructor(props: LogInProps){
        super(props)
        this.state = {
          username:"",
          password: "",
          isLoggedIn: false,
          isInValidCredentials: false
        }
    
        // bind method to class (for setState())
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
    
      handleChange = (e: React.FormEvent<any>) => {
        const { name, value } = e.currentTarget
        this.setState({ [name]: value } as unknown as Pick<LogInProps, keyof LogInState>)
      }
    
      handleSubmit(e: any){
        e.preventDefault()
        let formData = {
          username: this.state.username,
          password: this.state.password,
       }

       // Post formData to API
    axios({
        method: 'POST',
        url: 'http://localhost:5000/api/auth/login',
        data: formData
      })
      .then(res => {
  
          if (res.status === 200){
              // SET STATE FOR CONDITIONAL RENDERING

              // window.location.protocol+"//"+window.location.host
              
              // reset state
              this.setState({ 
                username: "",
                password: "",
                isLoggedIn: true
              })
              
              //Simulate an HTTP redirect:
              window.location.replace(window.location.protocol+"//"+window.location.host+"/post/create")
          } 
        
        })
      .catch(err =>{
        // SET STATE FOR CONDITIONAL RENDERING
        this.setState ({
          username:"",
          password: "",
          isLoggedIn: false,
          isInValidCredentials: true
        })

      })

    }

  // Life Cycle methods
  componentDidMount(){
    document.title = "Log In"
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
            <Card className="login-card">
              <CardHeader>
                <h5 className="login-card-title">Log In</h5>
              </CardHeader>
              <CardBody>
                <Form action="" onSubmit={this.handleSubmit}>

                 {this.state.isInValidCredentials ? <Col> <Button className="invalidCredentialsBtn" width="1000px" color="primary">Invalid Login Credentials</Button><br /><br /></Col>:
                 ""}




                    <Col className="px-md-1 username" md="5">
                      <FormGroup>
                        <Input
                          defaultValue=""
                          placeholder="Username"
                          type="text"
                          name="username"
                          onChange={this.handleChange}
                          required
                        /><br/>
                      </FormGroup>
                    </Col>     

                    <Col className="px-md-1 password" md="5">
                      <FormGroup>
                        <Input
                          defaultValue=""
                          placeholder="Password"
                          type="password"
                          name="password"
                          onChange={this.handleChange}
                          required
                        /><br/>
                      </FormGroup>
                    </Col>  

                <Button className="btn-fill login-btn" color="primary" type="submit">
                  Log In
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

export default Login;
