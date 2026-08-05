import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PricingServices } from './pricing.service';

const createPricingPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await PricingServices.createPricingPlanIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Pricing plan created successfully',
    data: result,
  });
});

const getAllPricingPlans = catchAsync(async (_req: Request, res: Response) => {
  const result = await PricingServices.getAllPricingPlansFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Pricing plans fetched successfully',
    data: result,
  });
});

const getPricingPlanById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PricingServices.getPricingPlanByIdFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Pricing plan fetched successfully',
    data: result,
  });
});

const updatePricingPlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PricingServices.updatePricingPlanInDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Pricing plan updated successfully',
    data: result,
  });
});

const deletePricingPlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PricingServices.deletePricingPlanFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Pricing plan deleted successfully',
    data: result,
  });
});

export const PricingControllers = {
  createPricingPlan,
  getAllPricingPlans,
  getPricingPlanById,
  updatePricingPlan,
  deletePricingPlan,
};
