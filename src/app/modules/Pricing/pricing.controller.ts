import { catchAsync } from './../../utils/catchAsync';
import sendResponse from './../..//utils/sendResponse';
import httpStatus from 'http-status';
import { PricingServices } from './pricing.service';

// Create Pricing Plan
const createPricing = catchAsync(async (req, res) => {
  const result = await PricingServices.createPricingIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricing Plan created successfully',
    data: result,
  });
});

// Get All Pricing Plans
const getAllPricing = catchAsync(async (_req, res) => {
  const result = await PricingServices.getAllPricingFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Pricing Plans retrieved successfully',
    data: result,
  });
});

// Get Single Pricing Plan
const getSinglePricing = catchAsync(async (req, res) => {
  const result = await PricingServices.getSinglePricingFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricing Plan retrieved successfully',
    data: result,
  });
});

// Update Pricing Plan
const updatePricing = catchAsync(async (req, res) => {
  const result = await PricingServices.updatePricingIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricing Plan updated successfully',
    data: result,
  });
});

// Delete Pricing Plan
const deletePricing = catchAsync(async (req, res) => {
  await PricingServices.deletePricingFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricing Plan deleted successfully',
  });
});

export const PricingControllers = {
  createPricing,
  getAllPricing,
  getSinglePricing,
  updatePricing,
  deletePricing,
};
