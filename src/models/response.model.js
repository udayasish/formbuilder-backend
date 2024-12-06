import mongoose, {Schema} from "mongoose";

const responseSchema = new Schema({
    // formId: mongoose.Schema.Types.ObjectId,
    responses: Array // Store user responses per question
  });

  
export const Response = mongoose.model("Response", responseSchema)