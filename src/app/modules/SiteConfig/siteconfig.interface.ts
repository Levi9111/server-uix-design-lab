export type TSocialLinks = {
  behance?: string;
  instagram?: string;
  linkedin?: string;
  dribbble?: string;
};

export type TSiteConfig = {
  primaryEmail: string;
  phone: string;
  location: string;
  calendlyUrl: string;
  telegramLink: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  socialLinks: TSocialLinks;
};
