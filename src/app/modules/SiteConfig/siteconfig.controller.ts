import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SiteConfigServices } from './siteconfig.service';

const getSiteConfig = catchAsync(async (_req: Request, res: Response) => {
  const result = await SiteConfigServices.getSiteConfigFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Site config fetched successfully',
    data: result,
  });
});

const updateSiteConfig = catchAsync(async (req: Request, res: Response) => {
  const result = await SiteConfigServices.updateSiteConfigInDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Site config updated successfully',
    data: result,
  });
});

export const SiteConfigControllers = {
  getSiteConfig,
  updateSiteConfig,
};
