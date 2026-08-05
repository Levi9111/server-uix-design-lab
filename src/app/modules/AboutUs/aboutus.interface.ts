export type TStatItem = {
  label: string;
  value: string;
};

export type TValueItem = {
  title: string;
  description: string;
  iconName?: string;
};

export type TAboutUs = {
  title: string;
  subtitle: string;
  stats: TStatItem[];
  values: TValueItem[];
};
