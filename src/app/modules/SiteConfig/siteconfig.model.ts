import { Schema, model } from 'mongoose';
import { TSiteConfig } from './siteconfig.interface';

const siteConfigSchema = new Schema<TSiteConfig>(
  {
    primaryEmail: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    calendlyUrl: { type: String, required: true, trim: true },
    telegramLink: { type: String, required: true, trim: true },
    telegramBotToken: { type: String, default: '' },
    telegramChatId: { type: String, default: '' },
    socialLinks: {
      behance: { type: String, default: '' },
      instagram: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      dribbble: { type: String, default: '' },
    },
  },
  { timestamps: true },
);

export const SiteConfigModel = model<TSiteConfig>('SiteConfig', siteConfigSchema);
