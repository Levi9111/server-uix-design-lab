export type TContactMessage = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
};

export type TBookingInitiatePayload = {
  service?: string;
  budget?: string;
  features?: string[];
  notes?: string;
};
