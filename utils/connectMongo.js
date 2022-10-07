import mongoose from "mongoose";
const uri = process.env.NEXT_PUBLIC_MONGO_URI;
//

const connectMongo = async () => mongoose.connect(uri);
export default connectMongo;
