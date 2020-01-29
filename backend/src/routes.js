import { Router } from 'express';
import multer from 'multer';

import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

const router = new Router();
const upload = multer(multerConfig);

router.post('/sessions', SessionController.store);
router.post('/users', UserController.store);

router.use(authMiddleware);

router.put('/users', UserController.update);

router.get('/providers', ProviderController.index);

router.post('/appointments', AppointmentController.store);
router.get('/appointments', AppointmentController.index);

router.post('/files', upload.single('file'), FileController.store);

export default router;
