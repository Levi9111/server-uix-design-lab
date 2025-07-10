import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FeaturesServices } from './features.service';

const createFeature = catchAsync(async (req: Request, res: Response) => {
  const result = await FeaturesServices.createFeatureIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Feature created successfully',
    data: result,
  });
});

const getAllFeatures = catchAsync(async (_req: Request, res: Response) => {
  const result = await FeaturesServices.getAllFeaturesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Features retrieved successfully',
    data: result,
  });
});

const getSingleFeature = catchAsync(async (req: Request, res: Response) => {
  const result = await FeaturesServices.getSingleFeatureFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feature retrieved successfully',
    data: result,
  });
});

const updateFeature = catchAsync(async (req: Request, res: Response) => {
  const result = await FeaturesServices.updateFeatureIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feature updated successfully',
    data: result,
  });
});

const deleteFeature = catchAsync(async (req: Request, res: Response) => {
  await FeaturesServices.deleteFeatureFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feature deleted successfully',
  });
});

export const FeaturesControllers = {
  createFeature,
  getAllFeatures,
  getSingleFeature,
  updateFeature,
  deleteFeature,
};
