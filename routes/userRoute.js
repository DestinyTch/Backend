import { Router } from 'express';
import { loginUser, registerUser, getUsers } from '../controllers/userController.js';
const userRouter = Router();

// Register user
userRouter.post('/register', registerUser);

// Login user
userRouter.post('/login', loginUser);

// Get all users (for admins or authorized users)
userRouter.get('/users', getUsers);

export default userRouter;
