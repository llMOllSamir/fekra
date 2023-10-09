import * as refactor from "../../../utils/Handler/reFactor.handler.js";
import commentModel from "./../../../../DB/models/comments.model.js";

let addComment = refactor.addMedia(commentModel);

let getAllComments = refactor.find(commentModel);

let getOneComment = refactor.findOne(commentModel);

let updateComment = refactor.updateMedia(commentModel);
``;
let likeComment = refactor.toggleLike(commentModel);

let deleteComment = refactor.deleteMedia(commentModel);

export {
  addComment,
  getAllComments,
  getOneComment,
  updateComment,
  likeComment,
  deleteComment,
};
