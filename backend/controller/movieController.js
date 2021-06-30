import express from "express";
import Movie from "../model/moviesModel.js";
import { createMovieValidate } from "../util/JoiValidation/movieValidation.js";
import cloudinary from "../util/imageUploader/cloudinary.js";

export const createMovie = async (req, res) => {
  const body = req.body;
  const file = req.file;
  console.log(file);
  let result
  if (file) {
    console.log("i am here");
    try {
     result = await cloudinary.uploader.upload(file.path);
      console.log(result);
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        error: error.message,
      });
    }
  }

  try {
    const { error } = createMovieValidate(req.body);
    if (error) {
      return res.status(400).json({
        status: "failed",
        error: error.details[0].message,
      });
    }

    const newMovie = new Movie({
      title: body.title,
      description: body.description,
      genre: body.genre,
      picture: result.url,
    });

    const savedMovie = await newMovie.save();
    if (savedMovie) {
      return res.status(201).json({
        status: "success",
        movie: savedMovie,
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "failed to add a movie",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const getAllMovie = async (req, res) => {
  try {
    const allMovie = await Movie.find({});
    if (allMovie) {
      return res.status(200).json({
        status: "success",
        movies: allMovie,
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "No Movie found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const getByMovieByid = async (req, res) => {
  const id = req.params.id;
  try {
    const singleMovie = await Movie.findById({ _id: id });
    if (singleMovie) {
      return res.status(200).json({
        status: "success",
        movie: singleMovie,
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "No Movie found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const getMovieByTitleName = (req, res) => {
  const movieTitle = req.query.title;
  try {
    const movie = Movie.find({ title: { $regex: movieTitle } });
    if (movie) {
      return res.status(200).json({
        status: "success",
        movie,
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "No Movie found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMovie = await Movie.findByIdAndDelete({ _id: id });
    if (deletedMovie) {
      return res.status(304).json({
        status: "success",
        message: "Movie successfully deleted",
        deletedMovie,
      });
    } else {
      return res.status(404).json({
        status: "failed",
        message: "movie not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
