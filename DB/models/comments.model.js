import { model, Schema } from "mongoose";

let commentSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
      min: [5, "comment should be more than 5 characters"],
      max: [300, "comment should be less than 300 characters"],
    },
    user: {
      type: Schema.ObjectId,
      ref: "user",
    },
    post: {
      type: Schema.ObjectId,
      ref: "post",
      require: true,
    },
    like: {
      type: [
        {
          type: Schema.ObjectId,
          ref: "user",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.pre(["find", "findOne"], function () {
  this.populate("user", "name image");
  this.populate("like", "name image");
});

let commentModel = model("comment", commentSchema);

export default commentModel;
