import { Router } from "express";
import { protectedRoute } from "../../utils/middleware/protected.routes.js";
import * as postController from "./controller/post.controller.js";

let postRouter = Router();

postRouter
  .route("/")
  .get(postController.getAllPosts)
  .post(protectedRoute, postController.addPost);

postRouter.get("/user", protectedRoute, postController.getUserPosts);

postRouter
  .route("/:id")
  .get(postController.getOnePost)
  .put(protectedRoute, postController.updatePost)
  .patch(protectedRoute, postController.likePost)
  .delete(protectedRoute, postController.deletePost);

export default postRouter;
