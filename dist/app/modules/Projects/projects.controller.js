"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const projects_service_1 = require("./projects.service");
const http_status_1 = __importDefault(require("http-status"));
const createProject = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await projects_service_1.ProjectsServices.createProjectIntoDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product is created succesfully',
        data: result,
    });
});
const getAllProjects = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const result = await projects_service_1.ProjectsServices.getAllProjectsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All projects fetched successfully',
        data: result,
    });
});
const getSingleProject = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await projects_service_1.ProjectsServices.getSingleProjectFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Project fetched successfully',
        data: result,
    });
});
const updateProject = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await projects_service_1.ProjectsServices.updateProjectIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Project updated successfully',
        data: result,
    });
});
const deleteProject = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await projects_service_1.ProjectsServices.deleteProjectFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Project deleted successfully',
    });
});
exports.ProjectsControllers = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
};
//# sourceMappingURL=projects.controller.js.map