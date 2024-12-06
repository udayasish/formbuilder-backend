import { Response } from "../models/response.model.js"; // Assuming Response model exists to store responses
import { Form } from "../models/form.model.js"; // Form model to validate form existence

export const submitResponse = async (req, res) => {
  try {
    const { userResponses } = req.body;

    // Validate if formId and userResponses are provided
    if (!userResponses) {
      return res.status(400).json({ message: "Form ID and user responses are required." });
    }

    // Assuming that userResponses is an array of objects, each containing a questionId and answer
    // Example: [{ questionId: "someQuestionId", answer: "Some answer" }]
    const response = new Response({
      responses:userResponses,
    });

    // Save the response to the database
    await response.save();

    return res.status(201).json({
      message: "Response saved successfully",
      responseId: response._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while saving the response." });
  }
};


export const getResponse = async (req, res) => {
    try {
      const { formId } = req.params;
  
      // Validate if formId is provided
      if (!formId) {
        return res.status(400).json({ message: "Form ID is required." });
      }
  
      // Fetch all responses for the given formId
      const responses = await Response.find({ formId });
  
      if (responses.length === 0) {
        return res.status(404).json({ message: "No responses found for this form." });
      }
  
      return res.status(200).json({
        message: "Responses fetched successfully",
        responses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching responses." });
    }
  };