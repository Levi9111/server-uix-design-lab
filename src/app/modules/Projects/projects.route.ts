import { Router, Request, Response, NextFunction } from 'express';
import { ProjectValidations } from './projects.validation';
import { fileUploader } from '../../utils/fileUploader';
import validateRequest from '../../../app/middlewares/validateRequest';
import { ProjectsControllers } from './projects.controller';

const router = Router();

router.post(
  '/create-project',
  fileUploader.upload.single('file'),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProjectValidations.createProjectValidationSchema),
  ProjectsControllers.createProject,
);

router.patch(
  '/update-project/:id',
  validateRequest(ProjectValidations.updateProjectValidationSchema),
  ProjectsControllers.updateProject,
);

router.get('/', ProjectsControllers.getAllProjects);

router.get('/:id', ProjectsControllers.getSingleProject);

router.delete('/:id', ProjectsControllers.deleteProject);

export const ProjectRoutes = router;
