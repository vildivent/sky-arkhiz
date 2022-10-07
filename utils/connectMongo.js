import mongoose from "mongoose";

const connectMongo = async () =>
  mongoose.connect(
    "mongodb+srv://admin:admin135@cluster0.lurv3cr.mongodb.net/sky-arkhyz?retryWrites=true&w=majority"
  );
export default connectMongo;
