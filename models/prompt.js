import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String, // Use String instead of string from yup
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String, // Use String instead of string from yup
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
