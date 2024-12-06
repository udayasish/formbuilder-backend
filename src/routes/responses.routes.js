import { Router } from "express";
import { submitResponse, getResponse } from "../controllers/response.controller.js"; 

const router = Router();

// Route for submitting user responses
router.route("/").post(submitResponse);

router.route("/:formId").get(getResponse);

// Export the router
export default router;
