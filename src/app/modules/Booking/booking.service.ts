import { TContactMessage, TBookingInitiatePayload } from './booking.interface';
import { SiteConfigServices } from '../SiteConfig/siteconfig.service';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const sendTelegramNotification = async (payload: TContactMessage) => {
  const config = await SiteConfigServices.getSiteConfigFromDB();
  const botToken = config.telegramBotToken || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = config.telegramChatId || process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    const text = `📬 *New Website Contact Message*\n\n*Name:* ${payload.name}\n*Email:* ${payload.email}\n*Phone:* ${payload.phone || 'N/A'}\n*Service:* ${payload.service || 'N/A'}\n*Budget:* ${payload.budget || 'N/A'}\n\n*Message:* ${payload.message}`;
    
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });
    } catch (err) {
      console.error('Failed to send Telegram message:', err);
    }
  }
  return { status: 'sent', message: 'Message sent successfully' };
};

const initiateBooking = async (payload: TBookingInitiatePayload) => {
  const config = await SiteConfigServices.getSiteConfigFromDB();
  if (!config.calendlyUrl) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Calendly URL is not configured on the server');
  }

  const queryParams = new URLSearchParams();
  if (payload.service) queryParams.append('service', payload.service);
  if (payload.budget) queryParams.append('budget', payload.budget);
  if (payload.notes) queryParams.append('notes', payload.notes);

  const finalUrl = queryParams.toString()
    ? `${config.calendlyUrl}?${queryParams.toString()}`
    : config.calendlyUrl;

  return { redirectUrl: finalUrl };
};

export const BookingServices = {
  sendTelegramNotification,
  initiateBooking,
};
