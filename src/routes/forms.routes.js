import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { getForm, submitForm } from "../controllers/form.controller.js";

const router = Router();

router.route("/").post(
  upload.fields([
    {
      name: "headerImage", //front end name should be same
      maxCount: 1,
    },
    {
      name: "questionImage", //front end name should be same
      maxCount: 1,
    },
  ]),
  submitForm
);

router.route("/:id").get(getForm);

export default router;
