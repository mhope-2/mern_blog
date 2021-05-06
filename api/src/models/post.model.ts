import * as mongoose from 'mongoose'
import PostInterface from '../interfaces/post.interface'

const PostSchema = new mongoose.Schema({

    post_image_path:{type: String, required: true},
    post_title:{type: String, required: true},
    post_body: {type: String, required: true},
    username: {type: String, required:true},
},
{timestamps:true}
)

const PostModel = mongoose.model<PostInterface & mongoose.Document>('Post', PostSchema);
 
export default PostModel