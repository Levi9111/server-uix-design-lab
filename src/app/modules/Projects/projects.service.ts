import { Request } from 'express';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TProjects } from './projects.interface';
import { Projects } from './projects.model';
import { fileUploader } from '../../../app/utils/fileUploader';

// Create Project
const createProjectIntoDB = async (req: Request) => {
  if (req.file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
    req.body.product.productImgUrl = uploadToCloudinary.secure_url;
  }

  const { product } = req.body;

  const result = await Projects.create(product);
  return result;
};

// Update Project
const updateProjectIntoDB = async (id: string, payload: Partial<TProjects>) => {
  const project = await Projects.findById(id);

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project Not Found');
  }

  for (const [key, value] of Object.entries(payload)) {
    (project as any)[key as keyof TProjects] = value;
  }

  const result = await project.save();
  return result;
};

// Get All Projects
const getAllProjectsFromDB = async () => {
  const result = await Projects.find();
  return result;
};

// Get Single Project
const getSingleProjectFromDB = async (id: string) => {
  const result = await Projects.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project Not Found');
  }

  return result;
};

// Delete Project
const deleteProjectFromDB = async (id: string) => {
  const deleted = await Projects.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete project!');
  }

  return deleted;
};

export const ProjectsServices = {
  createProjectIntoDB,
  updateProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  deleteProjectFromDB,
};
