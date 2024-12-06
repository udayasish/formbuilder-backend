import { Form } from "../models/form.model.js";
import { uploadInCloudinary } from "../utils/cloudinary.js"; 

export const submitForm = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions) {
      return res.status(400).json({ message: "Title and questions are required." });
    }

    // Upload the header image to Cloudinary
    const headerImageLocalPath = req.files?.headerImage?.[0]?.path || null;
    const headerImageUploadResult = headerImageLocalPath
      ? await uploadInCloudinary(headerImageLocalPath)
      : null;
    const headerImage = headerImageUploadResult?.secure_url || null;

    // Parse and process questions
    const parsedQuestions = JSON.parse(questions); // Parse questions if sent as a JSON string

    // Upload question images to Cloudinary and add their URLs to the questions
    const updatedQuestions = await Promise.all(
      parsedQuestions.map(async (question, index) => {
        const questionImageLocalPath = req.files?.questionImage?.[index]?.path || null;
        
        
        const questionImageUploadResult = questionImageLocalPath
          ? await uploadInCloudinary(questionImageLocalPath)
          : null;
        return {
          ...question,
          image: questionImageUploadResult?.secure_url || null,
        };
      })
    );

    // Create a new form document
    const newForm = new Form({
      title,
      headerImage,
      questions: updatedQuestions,
    });

    // Save the form to the database
    await newForm.save();

    // res.status(201).json({ message: "Form created successfully", formId: newForm._id });
    res.status(201).json({ newForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the form." });
  }
};


/**
 * Controller to fetch a specific form by ID (GET /forms/:id)
 */
export const getForm = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the form by its ID
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    res.status(200).json(form); // Send the form as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving the form." });
  }
};
