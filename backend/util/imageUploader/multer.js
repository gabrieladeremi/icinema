import multer from "multer";
import express from "express";

const app = express();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  },
});

export default multer({ storage: storage }).single("picture");
