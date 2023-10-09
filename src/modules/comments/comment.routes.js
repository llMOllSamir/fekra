import { Router } from "express";
import { protectedRoute } from "../../utils/middleware/protected.routes.js";
import * as commentController from "./controller/comment.controller.js";

let commentRouter = Router();

commentRouter
  .route("/")
  .get(commentController.getAllComments)
  .post(protectedRoute, commentController.addComment);

commentRouter
  .route("/:id")
  .get(commentController.getOneComment)
  .put(protectedRoute, commentController.updateComment)
  .patch(protectedRoute, commentController.likeComment)
  .delete(protectedRoute, commentController.deleteComment);

export default commentRouter;
