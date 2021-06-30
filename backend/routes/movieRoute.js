import express from "express";
import {
  deleteMovie,
  getAllMovie,
  getByMovieByid,
  getMovieByTitleName,
  createMovie,
} from "../controller/movieController.js";

const router = express.Router();

router.get("/getAllMovie", getAllMovie);
router.get("/getMovieById/:id", getByMovieByid);
router.get("/getMovieByName", getMovieByTitleName);
router.post("/createMovie", createMovie);
router.delete("/deleteMovie/:id", deleteMovie);

export default router;
