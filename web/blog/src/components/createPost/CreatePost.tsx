import React from 'react';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";

import './CreatePost.css';
import axios from 'axios';
import Header from "../header/Header"


interface CreatePostProps{
  postImagePath: string,
  postTitle: string,
  postBody: string,
  username: string
}

interface CreatePostState{
  postImagePath: string,
  postTitle: string,
  postBody: string,
  username: string
}


class CreatePost extends React.Component<{}, CreatePostProps, CreatePostState>{

  constructor(props: CreatePostProps){
    super(props)
    this.state = {
      postImagePath: "",
      postTitle: "",
      postBody: "",
      username: ""
      
    }

    // bind method to class (for setState())
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e: React.FormEvent<any>) => {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value } as unknown as Pick<CreatePostState, keyof CreatePostState>)
  }

  handleSubmit(e: any){
    e.preventDefault()
    let formData = {
      postImagePath: this.state.postImagePath,
      postTitle: this.state.postTitle,
      postBody: this.state.postBody,
      username: "mhope"
    }

    // Post formData to API
    axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin': '*'
                },
      url: 'http://localhost:5000/api/posts/add',
      data: formData
    })
    .then(res => {

        if (res.status === 200){

          // window.location.protocol+"//"+window.location.host

          // SET STATE FOR CONDITIONAL RENDERING                      
            // reset state
            this.setState({
              postImagePath: "",
              postTitle: "",
              postBody: "",
              username: "mhope"
            })
            
            //Simulate an HTTP redirect:
            // window.location.replace(window.location.protocol+"//"+window.location.host+"/login")
        } 
      
      })
    .catch(err => {
      alert(err)
    })


  }


  // Life Cycle methods
  componentDidMount(){
    document.title = "Create Post"
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
                <h5 className="signup-card-title">Create Blog Post</h5>
              </CardHeader>
              <CardBody>
                <Form enctype="multipart/form-data">
                <Col className="px-md-1 post-image" md="5">
                        <Label for="post-image" id="post-image-label">Select Post Image</Label><br/>
                        <Input
                          type="file"
                          name="postImagePath"
                          id="post-image"
                          onChange={this.handleChange}
                          value={this.state.postImagePath} 
                          required
                        /><br/>
                    </Col>  

                    <Col className="px-md-1 post-title" md="10">
                      <FormGroup>
                        <Input
                          defaultValue=""
                          placeholder="Post Title"
                          type="text"
                          name="postTitle"
                          onChange={this.handleChange}
                          value={this.state.postTitle} 
                          required
                        /><br/>
                      </FormGroup>
                    </Col>     

                    <Col className="px-md-1 post-body" md="10"> 
                      <FormGroup>
                        <Input
                          defaultValue=""
                          id="post-text-area"
                          placeholder="Post Body"
                          type="textarea"
                          name="postBody"
                          onChange={this.handleChange}
                          value={this.state.postBody} 
                          required
                        /><br/>
                      </FormGroup>
                    </Col>  

                <Button className="btn-fill signup-btn" color="primary" type="submit">
                  Publish Post
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

export default CreatePost;
