"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const projects_validation_1 = require("./projects.validation");
const fileUploader_1 = require("../../utils/fileUploader");
const validateRequest_1 = __importDefault(require("../../../app/middlewares/validateRequest"));
const projects_controller_1 = require("./projects.controller");
const router = (0, express_1.Router)();
router.post('/create-project', fileUploader_1.fileUploader.upload.single('file'), (req, _res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(projects_validation_1.ProjectValidations.createProjectValidationSchema), projects_controller_1.ProjectsControllers.createProject);
router.patch('/update-project/:id', (0, validateRequest_1.default)(projects_validation_1.ProjectValidations.updateProjectValidationSchema), projects_controller_1.ProjectsControllers.updateProject);
router.get('/', projects_controller_1.ProjectsControllers.getAllProjects);
router.get('/:id', projects_controller_1.ProjectsControllers.getSingleProject);
router.delete('/delete-project/:id', projects_controller_1.ProjectsControllers.deleteProject);
exports.ProjectRoutes = router;
//# sourceMappingURL=projects.route.js.map