import mongoose, { models } from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    groupSize: { type: Number, required: true },
    dates: [{ type: String, required: true }],
    comment: { type: String, default: "" },
    description: { type: String, default: "" },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

const Request = models.Request || mongoose.model("Request", RequestSchema);

export default Request;