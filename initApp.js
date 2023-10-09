import AppError from "./src/utils/services/appError.js";
import handelGlobalError from "./src/utils/middleware/handelGlobalError.js";
import userRouter from "./src/modules/user/user.routes.js";
import authRouter from "./src/modules/auth/auth.routes.js";
import postRouter from "./src/modules/post/post.routes.js";
import commentRouter from "./src/modules/comments/comment.routes.js";

let initApp = (app) => {
  /*=============
      Routes
  ==============*/
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/comment", commentRouter);

  // wrong api
  app.use("*", (req, res, next) => {
    next(new AppError(`URL ${req.originalUrl} is Not exist`, 404));
  });

  // Global error handler
  app.use(handelGlobalError);
};

export default initApp;
