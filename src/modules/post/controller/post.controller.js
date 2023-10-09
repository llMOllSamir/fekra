import * as refactor from "../../../utils/Handler/reFactor.handler.js";
import responseData from "../../../utils/Handler/response.js";
import handelAsyncError from "../../../utils/middleware/handelAsyncError.js";
import postModel from "./../../../../DB/models/post.model.js";

let addPost = refactor.addMedia(postModel);

let updatePost = refactor.updateMedia(postModel);

let likePost = refactor.toggleLike(postModel);

let deletePost = refactor.deleteMedia(postModel);

let getAllPosts = refactor.find(postModel);

let getOnePost = refactor.findOne(postModel);

let getUserPosts = handelAsyncError(async (req, res, next) => {
  let posts = await postModel.find({ user: req.user._id });
  responseData(res, posts);
});

export {
  addPost,
  updatePost,
  getUserPosts,
  deletePost,
  getAllPosts,
  getOnePost,
  likePost,
};
