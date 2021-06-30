import express from "express";
import {
  deleteMovie,
  getAllMovie,
  getByMovieByid,
  getMovieByTitleName,
  createMovie,
} from "../controller/movieController.js";
import multer from "../util/imageUploader/multer.js";

const router = express.Router();

router.get("/getAllMovie", getAllMovie);
router.get("/getMovieById/:id", getByMovieByid);
router.get("/getMovieByName", getMovieByTitleName);
router.post("/createMovie", multer, createMovie);
router.delete("/deleteMovie/:id", deleteMovie);

export default router;
