const jwt = require('jsonwebtoken')
import express from 'express'
import Controller from '../interfaces/controller.interface'
import PostInterface from '../interfaces/post.interface'
import PostModel from '../models/post.model'
import HttpException from '../exceptions/http/HttpException'
import PostNotFoundException from '../exceptions/post/PostNotFoundException' 
import CreatePostDto from '../post/post.dto'
import validationMiddleware from '../middleware/validation.middleware'
import authMiddleware from '../middleware/auth.middleware';


class PostController implements Controller {
    public path = '/posts';
    public router = express.Router();
    private post = PostModel;
   
    constructor() {
      this.initializeRoutes()
    }


   
    private initializeRoutes() {
      this.router.get(this.path, this.postList);
      this.router.get(`${this.path}/:id`, this.findPostById);
      this.router.post(`${this.path}/add`, authMiddleware, validationMiddleware(CreatePostDto), this.addPost);
      this.router.patch(`${this.path}/update/:id`, authMiddleware, this.updatePostById);
      this.router.delete(`${this.path}/delete`, authMiddleware, this.deletePostById);
    }
   

    // list all posts
    private postList = async (req:express.Request, res:express.Response) => {
        await this.post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err)) 
    } 

   
    // add post
    private addPost = async (req:express.Request, res:express.Response) => {
      const addPostData : CreatePostDto = req.body
      const newPost = new this.post(addPostData)
      
      const saveNewPost = await newPost.save()
      .then(() => res.json({"Response":`Post ${addPostData.postTitle} added`}))
      .catch(err => res.status(400).json('Error: ' + err));
  }


  // Get post Info by Id
  private findPostById = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

    this.post.findById(req.params.id)
    .then(post => {
      if (post)
        res.json(post)
      else {
        next(new HttpException(404, 'Post not found'));
      }
    })
  }


  // Update Exercide
   private updatePostById = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

    const id = req.params.id
    const updatePostData: PostInterface = req.body

    this.post.findByIdAndUpdate(id, updatePostData, {new: true})
    .then(post => {
      if (post)
        res.json({"Response":`Post with id ${id} updated`})
      else{
        next(new PostNotFoundException(id))
      }
    }    

    )}


    // Delete by id
    private deletePostById = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        const id = req.body.id
        this.post.findByIdAndDelete(id)
        .then(successResponse => {
          if (successResponse) {
              res.json({"Response":`Post with id ${id} deleted successfully`});
          } else {
            next(new PostNotFoundException(id));
          }
        })
    }
  // class end
  }

export default PostController