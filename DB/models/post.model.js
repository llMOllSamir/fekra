import { model, Schema } from "mongoose";

let postSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
      min: [5, "post should be more than 5 characters"],
      max: [500, "post should be less than 500 characters"],
    },
    user: {
      type: Schema.ObjectId,
      ref: "user",
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "post",
});

postSchema.pre(["find", "findOne"], function () {
  this.populate("comments");
  this.populate("user", "name image");
  this.populate("like", "name image");
});

let postModel = model("post", postSchema);

export default postModel;
