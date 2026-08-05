import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middlewares/auth.middleware';
import { ProjectControllers } from './projects.controller';
import { ProjectValidation } from './projects.validation';

const router = express.Router();

router.get('/', ProjectControllers.getAllProjects);
router.get('/:id', ProjectControllers.getProjectById);
router.post(
  '/',
  auth('ADMIN'),
  validateRequest(ProjectValidation.createProjectValidationSchema),
  ProjectControllers.createProject,
);
router.patch(
  '/:id',
  auth('ADMIN'),
  validateRequest(ProjectValidation.updateProjectValidationSchema),
  ProjectControllers.updateProject,
);
router.delete('/:id', auth('ADMIN'), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
