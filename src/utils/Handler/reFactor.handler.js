import { destroyOne } from "../cloudinary/fileUploader.js";
import AppError from "./../services/appError.js";
import ApiFeature from "./ApiFeatures.js";
import handelAsyncError from "./../middleware/handelAsyncError.js";
import responseData from "./response.js";

/**
 * delete one Document in the collection
 */
let deleteOne = (model, modelName = "item") => {
  return handelAsyncError(async (req, res, next) => {
    let { id } = req.params;
    // check is exist in the DataBase Or not
    let existed = await model.findById(id);
    if (existed) {
      // delete the document
      let deleted = await model.findByIdAndDelete(id);
      // delete the image from cloudinary
      if (existed.image) {
        await destroyOne(existed.image.public_id);
      }
      // respond FrontEnd With the deleted document
      res.json({ message: "success", data: deleted });
    } else {
      // send an error for not Found document
      next(new AppError(`${modelName} is not exist`, 404));
    }
  });
};

/**
 * find all  Document in the collection
 */
let find = (model) => {
  return handelAsyncError(async (req, res, next) => {
    // get total results in th model
    let results = await model.find();
    //  using ApiFeature for search in the model
    let mongoModel = new ApiFeature(model, req.query)
      .pagination() /** control the pages */
      .filter() /** control the filter  */
      .search() /** Searching in the name  */
      .sort() /** sort data */
      .fields(); /** chose fields */
    // call query
    let all = await mongoModel.model;
    // response
    res.json({
      message: "success",
      totalResults: results.length,
      metaData: {
        currentPage: mongoModel.page,
        numberOfPages: Math.floor(results.length / mongoModel.limit) + 1,
        limit: mongoModel.limit,
        results: all.length,
      },
      data: all,
    });
  });
};

/**
 * find specific Document in the collection
 */
let findOne = (model) => {
  return handelAsyncError(async (req, res, next) => {
    let { id } = req.params;
    //  get data
    let data = await model.find({ _id: id });
    // response
    res.json({
      message: "success",
      metaData: {
        currentPage: 1,
        limit: 1,
        results: data.length,
      },
      data,
    });
  });
};

/**
 * delete one Media in the collection
 */
let deleteMedia = (model) => {
  return handelAsyncError(async (req, res, next) => {
    // find media
    let media = await model.findById(req.params.id);
    // check media exist
    if (!media) return next(new AppError("media Not Found", 404));
    //    check Authorized
    if (media.user._id.toString() != req.user._id.toString())
      return next(new AppError("you not Authorized", 403));
    // delete media
    await model.findByIdAndDelete(req.params.id);
    responseData(res);
  });
};

/**
 * toggle Like on Media in the collection
 */
let toggleLike = (model) => {
  return handelAsyncError(async (req, res, next) => {
    // find media
    let media = await model.findById(req.params.id);
    // check media exist
    if (!media) return next(new AppError("media Not Found", 404));
    let findLike = media.like.find(
      (user) => user._id.toString() == req.user._id.toString()
    );
    let updated;
    if (findLike) {
      updated = await model.findByIdAndUpdate(
        media._id,
        {
          $pull: { like: req.user._id },
        },
        { new: true }
      );
    } else {
      updated = await model.findByIdAndUpdate(
        media._id,
        {
          $addToSet: { like: req.user._id },
        },
        { new: true }
      );
    }
    responseData(res, updated);
  });
};

/**
 * add one Media in the collection
 */
let addMedia = (model) => {
  return handelAsyncError(async (req, res, next) => {
    let newMedia = new model(req.body);
    newMedia.user = req.user._id;
    await newMedia.save();
    responseData(res, newMedia);
  });
};
/**
 * update one Media in the collection
 */
let updateMedia = (model) => {
  return handelAsyncError(async (req, res, next) => {
    // find media
    let media = await model.findById(req.params.id);
    // check media exist
    if (!media) return next(new AppError("media Not Found", 404));
    //   check user who create this media
    if (media.user._id.toString() != req.user._id.toString())
      return next(new AppError("you not Authorized", 403));
    // update media content after change
    media.content = req.body.content;
    await media.save();
    responseData(res, media);
  });
};

export {
  deleteOne,
  find,
  findOne,
  addMedia,
  updateMedia,
  toggleLike,
  deleteMedia,
};
