import { TProject } from './projects.interface';
import { ProjectModel } from './projects.model';

const createProjectIntoDB = async (payload: TProject) => {
  const result = (await ProjectModel.create(payload)).populate('categoryId');
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await ProjectModel.find().populate('categoryId');
  return result;
};

const getProjectByIdFromDB = async (id: string) => {
  const result = await ProjectModel.findById(id).populate('categoryId');
  return result;
};

const updateProjectInDB = async (id: string, payload: Partial<TProject>) => {
  const result = await ProjectModel.findByIdAndUpdate(id, payload, { new: true }).populate('categoryId');
  return result;
};

const deleteProjectFromDB = async (id: string) => {
  const result = await ProjectModel.findByIdAndDelete(id);
  return result;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectInDB,
  deleteProjectFromDB,
};
