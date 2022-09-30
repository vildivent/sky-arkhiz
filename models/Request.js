import mongoose, { models } from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    groupSize: { type: Number, required: true },
    dates: [{ type: String, required: true }],
    description: { type: String, default: "" },
    checked: { type: Boolean, default: false },
    fulfilled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Request = models.Request || mongoose.model("Request", RequestSchema);

export default Request;
