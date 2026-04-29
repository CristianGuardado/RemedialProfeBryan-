import express from "expresss";
import loginStudentController from "../controllers/loginStudentController";

const router = express.Router();

router.route("/").post(loginStudentController.login);

export default router;