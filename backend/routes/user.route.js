import express from 'express'
import { login,logout,register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
<<<<<<< Updated upstream
router.route("/logout").get(logout);
=======
router.route("/logout").post(logout);
>>>>>>> Stashed changes
router.route("/profile/update").post(isAuthenticated, updateProfile);

//we get router from express

export default router;