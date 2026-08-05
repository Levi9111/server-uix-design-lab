import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { BookingControllers } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/send-message',
  validateRequest(BookingValidation.contactMessageSchema),
  BookingControllers.sendMessage,
);

router.post(
  '/initiate',
  validateRequest(BookingValidation.bookingInitiateSchema),
  BookingControllers.initiateBooking,
);

export const BookingRoutes = router;
