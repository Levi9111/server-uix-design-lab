import { TSiteConfig } from './siteconfig.interface';
import { SiteConfigModel } from './siteconfig.model';

const getSiteConfigFromDB = async () => {
  let config = await SiteConfigModel.findOne();
  if (!config) {
    config = await SiteConfigModel.create({
      primaryEmail: 'info@uixdesignlab.com',
      phone: '+1 (555) 000-0000',
      location: 'San Francisco, CA',
      calendlyUrl: 'https://calendly.com',
      telegramLink: 'https://t.me',
      socialLinks: {
        behance: 'https://behance.net',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
        dribbble: 'https://dribbble.com',
      },
    });
  }
  return config;
};

const updateSiteConfigInDB = async (payload: Partial<TSiteConfig>) => {
  let config = await SiteConfigModel.findOne();
  if (!config) {
    config = await SiteConfigModel.create(payload);
  } else {
    config = await SiteConfigModel.findByIdAndUpdate(config._id, payload, { new: true });
  }
  return config;
};

export const SiteConfigServices = {
  getSiteConfigFromDB,
  updateSiteConfigInDB,
};
