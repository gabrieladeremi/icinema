import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
    },
    description: {
      type: String,
    },
    picture: {
        type:String,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamp: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
