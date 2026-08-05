import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FeatureServices } from './features.service';

const createFeature = catchAsync(async (req: Request, res: Response) => {
  const result = await FeatureServices.createFeatureIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Feature created successfully',
    data: result,
  });
});

const getAllFeatures = catchAsync(async (_req: Request, res: Response) => {
  const result = await FeatureServices.getAllFeaturesFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Features fetched successfully',
    data: result,
  });
});

const getFeatureById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeatureServices.getFeatureByIdFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Feature fetched successfully',
    data: result,
  });
});

const updateFeature = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeatureServices.updateFeatureInDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Feature updated successfully',
    data: result,
  });
});

const deleteFeature = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeatureServices.deleteFeatureFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Feature deleted successfully',
    data: result,
  });
});

export const FeatureControllers = {
  createFeature,
  getAllFeatures,
  getFeatureById,
  updateFeature,
  deleteFeature,
};
