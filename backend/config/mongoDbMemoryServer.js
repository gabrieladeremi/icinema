import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const MongDb = new MongoMemoryServer();

export const testDbConnect = () => {
  const URI = MongDb.getUri();
  const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  await mongoose.connect(URI, mongooseOptions);
  console.log("mongodb-memory-server connected");
};

export const testDbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await MongDb.stop();
};
