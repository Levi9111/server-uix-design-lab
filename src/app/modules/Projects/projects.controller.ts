import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectServices } from './projects.service';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.createProjectIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Project created successfully',
    data: result,
  });
});

const getAllProjects = catchAsync(async (_req: Request, res: Response) => {
  const result = await ProjectServices.getAllProjectsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Projects fetched successfully',
    data: result,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.getProjectByIdFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project fetched successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.updateProjectInDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project updated successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.deleteProjectFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project deleted successfully',
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
