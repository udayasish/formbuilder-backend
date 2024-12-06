import mongoose, {Schema} from "mongoose";

const formSchema = new Schema({
    title: String,
    headerImage: String,
    questions: [
      {
        type: { type: String, enum: ['Categorize', 'Cloze', 'Comprehension'] },
        content: Object, 
        image: String,
      },
    ],
  });

  export const Form = mongoose.model("Form", formSchema)