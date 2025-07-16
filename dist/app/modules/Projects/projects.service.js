"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const projects_model_1 = require("./projects.model");
const fileUploader_1 = require("../../../app/utils/fileUploader");
const createProjectIntoDB = async (req) => {
    if (req.file) {
        const uploadToCloudinary = await fileUploader_1.fileUploader.uploadToCloudinary(req.file);
        req.body.project.projectImageUrl = uploadToCloudinary.secure_url;
    }
    const { project } = req.body;
    const result = await projects_model_1.Projects.create(project);
    return result;
};
const updateProjectIntoDB = async (id, payload) => {
    const project = await projects_model_1.Projects.findById(id);
    if (!project) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Project Not Found');
    }
    for (const [key, value] of Object.entries(payload)) {
        project[key] = value;
    }
    const result = await project.save();
    return result;
};
const getAllProjectsFromDB = async () => {
    const result = await projects_model_1.Projects.find();
    return result;
};
const getSingleProjectFromDB = async (id) => {
    const result = await projects_model_1.Projects.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Project Not Found');
    }
    return result;
};
const deleteProjectFromDB = async (id) => {
    const deleted = await projects_model_1.Projects.findByIdAndDelete(id);
    if (!deleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete project!');
    }
    return deleted;
};
exports.ProjectsServices = {
    createProjectIntoDB,
    updateProjectIntoDB,
    getAllProjectsFromDB,
    getSingleProjectFromDB,
    deleteProjectFromDB,
};
//# sourceMappingURL=projects.service.js.map